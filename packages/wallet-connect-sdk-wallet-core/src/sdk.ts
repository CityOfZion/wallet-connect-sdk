import SignClient from '@walletconnect/sign-client'
import { formatJsonRpcError } from '@walletconnect/jsonrpc-utils'
import EventEmitter from 'events'
import TypedEmitter from 'typed-emitter'
import moment from 'moment'
import {
  TApprovalDateStorage,
  TEvents,
  TRejectReason,
  TRequestResult,
  TOptions,
  TSession,
  TSessionProposal,
  TSessionRequest,
  TApproveSessionOptions,
  TRequestError,
  TNamespaces,
  EStatus,
  TAdapterMethodParam,
} from './types'
import { DEFAULT_AUTO_ACCEPT_METHODS, DEFAULT_BLOCKCHAIN, Method } from '@cityofzion/wallet-connect-sdk-core'
import { AbstractWalletConnectNeonAdapter } from './adapter'

const APPROVAL_UNIX_STORAGE_KEY = 'wc-sdk:approvalsUnix'
const INIT_TIMEOUT = 7000

export class WcWalletSDK {
  /**
   * The WalletConnect Library
   */
  public client: SignClient | undefined

  /**
   * The Adapter to perform the WalletConnect requests
   */
  public adapter: AbstractWalletConnectNeonAdapter | undefined

  /**
   * The EventEmitter to listen for some property changes
   */
  public readonly emitter = new EventEmitter() as TypedEmitter<TEvents>

  private _sessions: TSession[] = []
  private _proposals: TSessionProposal[] = []
  private _requests: TSessionRequest[] = []
  private _status: EStatus = EStatus.NOT_STARTED
  private options: Required<Omit<TOptions, 'adapter'>>

  /**
   * To initialize the SDK you need to provide the options
   * @param options.clientOptions SignClient Startup options of the original WalletConnect library
   * @param options.adapter [adapter] The initial adapter
   * @param options.methods [methods] An array of valid methods used on your application
   * @param options.autoAcceptMethods [autoAcceptMethods=DEFAULT_AUTO_ACCEPT_METHODS] An array of valid auto accepted methods used on your application
   */
  constructor(options: TOptions) {
    this.options = {
      clientOptions: options.clientOptions,
      autoAcceptMethods: options.autoAcceptMethods ?? DEFAULT_AUTO_ACCEPT_METHODS,
      methods: options.methods,
    }

    this.adapter = options.adapter
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

    const approvals = sessions.map<TApprovalDateStorage>(({ topic, approvalUnix }) => ({ topic, approvalUnix }))
    this.client?.core.storage.setItem<TApprovalDateStorage[]>(APPROVAL_UNIX_STORAGE_KEY, approvals)
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
  private get signClient() {
    if (!this.client || this.status !== EStatus.STARTED) throw new Error('Client not started')

    return this.client
  }

  /**
   * It will init the WalletConnect Library SignClient and the SDK
   * @return {Promise.void}
   */
  public async init(): Promise<void> {
    this.status = EStatus.STARTING
    const abortController = new AbortController()

    const timeout = setTimeout(() => {
      if (this.status === EStatus.STARTED) return

      abortController.abort()
    }, INIT_TIMEOUT)

    return new Promise<void>(async (resolve, reject) => {
      try {
        abortController.signal.addEventListener('abort', () => {
          this.status = EStatus.ERROR
          reject(new Error('Initialization timeout has been reached'))
        })

        const client = await SignClient.init(this.options.clientOptions)
        clearTimeout(timeout)

        client.events.removeAllListeners('session_proposal')
        client.events.removeAllListeners('session_request')
        client.events.removeAllListeners('session_delete')

        client.on('session_proposal', proposal => {
          this.proposals = [...this.proposals, proposal]
        })
        client.on('session_request', async request => {
          if (this.options.autoAcceptMethods.includes(request.params.request.method as Method)) {
            await this.approveRequest(request)
            return
          }

          const filtered = this.requests.filter(item => item.id !== request.id)
          this.requests = [...filtered, request]
        })
        client.on('session_delete', ({ topic }) => {
          const filtered = this.sessions.filter(session => session.topic !== topic)
          this.sessions = filtered
        })

        const approvals = await client.core.storage.getItem<TApprovalDateStorage[]>(APPROVAL_UNIX_STORAGE_KEY)
        this.sessions = client.session.values.map(session => {
          const approvalUnixStorage = approvals?.find(({ topic }) => topic === session.topic)

          return {
            ...session,
            approvalUnix: approvalUnixStorage?.approvalUnix,
          }
        })

        this.status = EStatus.STARTED
        this.client = client
        resolve()
      } catch (error) {
        this.status = EStatus.ERROR
        reject(error)
      }
    })
  }

  /**
   * Start the process of establishing a new connection
   * @param uri URI provided by the dapp you want to connect to
   * @return {Promise.void}
   */
  public async connect(uri: string): Promise<void> {
    await this.signClient.pair({ uri })
  }

  /**
   * Disconnects from the specific dapp
   * @param session Session you want to disconnect
   * @param reason [reason="USER_DISCONNECTED"] The reason for the disconnection
   * @return {Promise.void}
   */
  public async disconnect(session: TSession, reason?: TRejectReason): Promise<void> {
    await this.signClient.disconnect({
      topic: session.topic,
      reason: reason ?? { code: 5900, message: 'USER_DISCONNECTED' },
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
      const namespaces: TNamespaces = {
        [DEFAULT_BLOCKCHAIN]: {
          methods: this.options.methods,
          accounts: [`${DEFAULT_BLOCKCHAIN}:${options.account.chain}:${options.account.address}`],
          events: [],
        },
      }

      const { acknowledged } = await this.signClient.approve({
        id: proposal.id,
        namespaces,
      })

      const session = await acknowledged()
      const approvalUnix = moment.utc().unix()
      const extendedSession = { ...session, approvalUnix }
      this.sessions = [...this.sessions, extendedSession]

      return extendedSession
    } catch (error) {
      throw error
    } finally {
      const filteredProposal = this.proposals.filter(({ id }) => id !== proposal.id)
      this.proposals = filteredProposal
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
      await this.signClient.reject({
        id: proposal.id,
        reason: reason ?? {
          code: 1,
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
      if (!this.adapter) throw new Error('Adapter not set')

      const session = this.sessions.find(session => session.topic === request.topic)
      if (!session) throw new Error('Session not found')

      const method = request.params.request.method as Method
      if (!this.options.methods.includes(method)) throw new Error('Invalid request method')

      const adapterMethod = this.adapter[method] as (params: TAdapterMethodParam) => Promise<any>
      if (!adapterMethod || typeof adapterMethod !== 'function') throw new Error('Invalid request method')

      const result = await adapterMethod.apply(this.adapter, [{ request, session }])

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

      await this.signClient.respond({
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
      await this.signClient.respond({
        topic: request.topic,
        response: formatJsonRpcError(
          request.id,
          reason ?? {
            code: 1,
            message: 'rejected by the user',
          }
        ),
      })
    } catch (error) {
      throw error
    } finally {
      const filteredRequests = this.requests.filter(({ id }) => id !== request.id)
      this.requests = filteredRequests
    }
  }
}
