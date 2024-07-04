import { formatJsonRpcError } from '@walletconnect/jsonrpc-utils'
import EventEmitter from 'events'
import TypedEmitter from 'typed-emitter'
import moment from 'moment'
import queryString from 'querystring'
import {
  TSessionExtendedStorage,
  TWalletCoreEvents,
  TRejectReason,
  TRequestResult,
  TInitOptions,
  TSession,
  TSessionProposal,
  TSessionRequest,
  TApproveSessionOptions,
  TRequestError,
  TNamespaces,
  EStatus,
  TAdapterMethodParam,
  ResponseErrorCode,
} from './types'
import { COMPATIBILITY_VERSION } from '@cityofzion/wallet-connect-sdk-core'
import { sleep } from './utils'
import Web3Wallet from '@walletconnect/web3wallet'
import Core from '@walletconnect/core'

const SESSION_EXTENDED_STORAGE_KEY = 'wc-sdk:extended-session'
const MIN_TIME_OF_EXECUTION = 250

export class WcWalletSDK {
  /**
   * The WalletConnect Library
   */
  public wallet: Web3Wallet | undefined
  /**
   * The EventEmitter to listen for some property changes
   */
  public readonly emitter = new EventEmitter() as TypedEmitter<TWalletCoreEvents>

  public clientOptions: TInitOptions['clientOptions']
  public blockchainsOptions: TInitOptions['blockchains']

  private _sessions: TSession[] = []
  private _proposals: TSessionProposal[] = []
  private _requests: TSessionRequest[] = []
  private _status: EStatus = EStatus.NOT_STARTED
  private _nonAdapterMethods: Record<string, (args: TAdapterMethodParam) => Promise<any>>

  private wccvs: Map<string, number> = new Map()

  /**
   * To initialize the SDK you need to provide the options
   * @param options.clientOptions Web3Wallet Startup options of the original WalletConnect library
   * @param options.adapter [adapter] The initial adapter
   * @param options.methods [methods] An array of valid methods used on your application
   * @param options.autoAcceptMethods [autoAcceptMethods=DEFAULT_AUTO_ACCEPT_METHODS] An array of valid auto accepted methods used on your application
   */
  constructor(options: TInitOptions) {
    this.clientOptions = options.clientOptions
    this.blockchainsOptions = options.blockchains
    this._nonAdapterMethods = {
      wipeRequests: this.wipeRequests.bind(this),
    }
  }

  /**
   * The list of WalletConnect connected proposals
   */
  get proposals() {
    return this._proposals
  }
  private set proposals(proposals: TSessionProposal[]) {
    this._proposals = proposals
    this.emitter.emit('proposals', proposals)
  }

  /**
   * The list of WalletConnect connected requests
   */
  get requests() {
    return this._requests
  }
  private set requests(requests: TSessionRequest[]) {
    this._requests = requests
    this.emitter.emit('requests', requests)
  }

  /**
   * The list of WalletConnect connected sessions
   */
  get sessions() {
    return this._sessions
  }
  private set sessions(sessions: TSession[]) {
    this._sessions = sessions
    this.emitter.emit('sessions', sessions)

    const extendedSession = sessions.map<TSessionExtendedStorage>(({ topic, approvalUnix, wccv }) => ({
      topic,
      approvalUnix,
      wccv,
    }))
    this.wallet?.core.storage.setItem<TSessionExtendedStorage[]>(SESSION_EXTENDED_STORAGE_KEY, extendedSession)
  }

  /**
   * the current status of initialization
   */
  get status() {
    return this._status
  }
  private set status(status: EStatus) {
    this._status = status
    this.emitter.emit('status', status)
  }

  /**
   * It will get WalletConnect Library or throw error
   */
  private get web3wallet(): Web3Wallet {
    if (!this.wallet || this.status !== EStatus.STARTED) throw new Error('Wallet client not started')

    return this.wallet
  }

  /**
   * It will init the WalletConnect Library Web3Wallet and the SDK
   * @return {Promise.void}
   */
  public async init(): Promise<void> {
    this.status = EStatus.STARTING

    try {
      const web3wallet = await Web3Wallet.init({
        signConfig: this.clientOptions.signConfig,
        core: new Core({
          projectId: this.clientOptions.core.projectId,
          logger: this.clientOptions.core.logger,
          relayUrl: this.clientOptions.core.relayUrl,
        }),
        metadata: this.clientOptions.metadata,
      })

      web3wallet.events.removeAllListeners('session_proposal')
      web3wallet.events.removeAllListeners('session_request')
      web3wallet.events.removeAllListeners('session_delete')

      web3wallet.on('session_proposal', (proposal) => {
        this.proposals = [...this.proposals, proposal]
      })
      web3wallet.on('session_request', async (request) => {
        const [blockchain] = request.params.chainId.split(':')
        const options = this.blockchainsOptions[blockchain]
        if (options && options.autoAcceptMethods && options.autoAcceptMethods.includes(request.params.request.method)) {
          await this.approveRequest(request)
          return
        }

        const filtered = this.requests.filter((item) => item.id !== request.id)
        this.requests = [...filtered, request]
      })
      web3wallet.on('session_delete', ({ topic }) => {
        const filtered = this.sessions.filter((session) => session.topic !== topic)
        this.sessions = filtered
      })

      const extendedSessions =
        await web3wallet.core.storage.getItem<TSessionExtendedStorage[]>(SESSION_EXTENDED_STORAGE_KEY)

      this.sessions = extendedSessions
        ? Object.values(web3wallet.getActiveSessions())
            .map((session) => {
              const storage = extendedSessions.find(({ topic }) => topic === session.topic)
              if (!storage) return undefined

              return {
                ...session,
                approvalUnix: storage.approvalUnix,
                wccv: storage.wccv,
              }
            })
            .filter((session): session is TSession => !!session)
        : []

      this.status = EStatus.STARTED
      this.wallet = web3wallet
    } catch (error) {
      this.status = EStatus.ERROR
      throw error
    }
  }

  /**
   * Start the process of establishing a new connection
   * @param uri URI provided by the dapp you want to connect to
   * @return {Promise.void}
   */
  public async connect(uri: string): Promise<void> {
    const [, uriQueryString] = uri.split('?')
    const queryParams = queryString.parse(uriQueryString)

    let wccv: number | undefined
    if (queryParams.wccv) {
      wccv = Number(queryParams.wccv)
      if (wccv > COMPATIBILITY_VERSION) throw new Error('Incompatible WCCV. Update your wallet to use new features.')
    }

    await this.wallet?.pair({
      uri,
    })
  }

  /**
   * Disconnects from the specific dapp
   * @param session Session you want to disconnect
   * @param reason [reason="USER_DISCONNECTED"] The reason for the disconnection
   * @return {Promise.void}
   */
  public async disconnect(session: TSession, reason?: TRejectReason): Promise<void> {
    await this.web3wallet.disconnectSession({
      topic: session.topic,
      reason: reason ?? {
        code: ResponseErrorCode.DISCONNECT,
        message: 'USER_DISCONNECTED',
      },
    })

    const filtered = this.sessions.filter(({ topic }) => session.topic !== topic)
    this.sessions = filtered
  }

  /**
   * Approve a specific proposal
   * @param proposal Session proposal you want to approve
   * @param options Options to build the session namespace
   * @param options.account An object of account that you want to connect to
   * @param options.account.chain The key of supported chain to which the account belongs
   * @param options.account.address The account address
   * @params options.blockchain [blockchain=DEFAULT_BLOCKCHAIN] The key of supported blockchain you want to connect to
   * @return {Promise.TSession} The session that was created
   */
  public async approveProposal(proposal: TSessionProposal, options: TApproveSessionOptions): Promise<TSession> {
    try {
      const blockchainOptions = this.blockchainsOptions[options.blockchain]
      if (!blockchainOptions) throw new Error('Invalid blockchain')

      const namespaces: TNamespaces = {
        [options.blockchain]: {
          methods: blockchainOptions.methods,
          accounts: [`${options.blockchain}:${options.chain}:${options.address}`],
          events: blockchainOptions.events ?? [],
        },
      }

      const session = await this.web3wallet.approveSession({
        id: proposal.id,
        namespaces,
      })

      const approvalUnix = moment.utc().unix()

      const wccv = this.wccvs.get(session.pairingTopic)

      const extendedSession = {
        ...session,
        approvalUnix,
        wccv,
      }
      this.sessions = [...this.sessions, extendedSession]

      return extendedSession
    } finally {
      const filteredProposal = this.proposals.filter(({ id }) => id !== proposal.id)
      this.proposals = filteredProposal

      if (proposal.params.pairingTopic) this.wccvs.delete(proposal.params.pairingTopic)
    }
  }

  /**
   * Reject a specific proposal
   * @param proposal Session proposal you want to reject
   * @param reason [reason="Rejected by the user"] The reason for the rejection
   * @return {Promise.void}
   */
  public async rejectProposal(proposal: TSessionProposal, reason?: TRejectReason): Promise<void> {
    try {
      await this.web3wallet.rejectSession({
        id: proposal.id,
        reason: reason ?? {
          code: ResponseErrorCode.REJECT,
          message: 'Rejected by the user',
        },
      })
    } finally {
      const filteredProposal = this.proposals.filter(({ id }) => id !== proposal.id)
      this.proposals = filteredProposal
    }
  }

  /**
   * Approve a specific request
   * @param request Session request you want to approve
   * @return {Promise.TRequestResult} The result of request invocation
   */
  public async approveRequest(request: TSessionRequest): Promise<TRequestResult> {
    let response!: TRequestResult | TRequestError

    try {
      const [blockchain] = request.params.chainId.split(':')
      if (!blockchain) throw new Error('Invalid blockchain')

      const blockchainOptions = this.blockchainsOptions[blockchain]
      if (!blockchainOptions.methods) throw new Error('Invalid blockchain')
      if (!blockchainOptions.adapter) throw new Error('Adapter not set or invalid blockchain')

      const session = this.sessions.find((session) => session.topic === request.topic)
      if (!session) throw new Error('Session not found')

      let result: any = null

      const method = request.params.request.method
      const nonAdapterMethod = this._nonAdapterMethods[method]

      const startExecutionTime = performance.now()

      if (nonAdapterMethod && typeof nonAdapterMethod === 'function') {
        result = await nonAdapterMethod.apply(this, [{ request, session }])
      } else if (blockchainOptions.methods.includes(method)) {
        const adapterMethod = blockchainOptions.adapter[method] as (params: TAdapterMethodParam) => Promise<any>
        if (!adapterMethod || typeof adapterMethod !== 'function') throw new Error('Invalid request method')

        result = await adapterMethod.apply(blockchainOptions.adapter, [{ request, session }])
      } else throw new Error('Invalid request method')

      const executionTime = Math.abs(performance.now() - startExecutionTime)
      if (executionTime < MIN_TIME_OF_EXECUTION) await sleep(MIN_TIME_OF_EXECUTION - executionTime)

      response = {
        id: request.id,
        jsonrpc: '2.0',
        result,
      }

      return response
    } catch (error: any) {
      response = formatJsonRpcError(request.id, error.message ?? 'Failed or Rejected Request')

      throw error
    } finally {
      const filteredRequests = this.requests.filter(({ id }) => id !== request.id)
      this.requests = filteredRequests

      await this.web3wallet.respondSessionRequest({
        topic: request.topic,
        response,
      })
    }
  }

  /**
   * Reject a specific request
   * @param request Session request you want to reject
   * @param reason [reason="Rejected by the user"] The reason for the rejection
   *  @return {Promise.void}
   */
  public async rejectRequest(request: TSessionRequest, reason?: TRejectReason): Promise<void> {
    try {
      await this.web3wallet.respondSessionRequest({
        topic: request.topic,
        response: formatJsonRpcError(
          request.id,
          reason ?? {
            code: ResponseErrorCode.REJECT,
            message: 'rejected by the user',
          },
        ),
      })
    } finally {
      const filteredRequests = this.requests.filter(({ id }) => id !== request.id)
      this.requests = filteredRequests
    }
  }

  private async wipeRequests({ session, request }: TAdapterMethodParam): Promise<string[]> {
    const wipedRequests: string[] = []
    const dappRequests: TSessionRequest[] = (this._requests.filter(
      (dappRequest: TSessionRequest) => dappRequest.topic === session.topic && dappRequest.id !== request.id,
    ) ?? []) as TSessionRequest[]

    await Promise.all(
      dappRequests.map(async (dappRequest) => {
        try {
          await this.web3wallet.respondSessionRequest({
            topic: dappRequest.topic,
            response: formatJsonRpcError(dappRequest.id, {
              code: ResponseErrorCode.REJECT,
              message: 'rejected by the dapp',
            }),
          })
        } finally {
          wipedRequests.push(dappRequest.params.request.method)
        }
      }),
    )

    this.requests = this.requests.filter((dappRequest: TSessionRequest) => dappRequest.topic !== session.topic)

    return wipedRequests
  }
}
