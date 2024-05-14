import SignClient from '@walletconnect/sign-client'
import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import { GetVersionResult } from '@cityofzion/neon-core/lib/rpc'
import {
  Neo3Signer,
  SignMessagePayload,
  SignedMessage,
  ContractInvocation,
  ContractInvocationMulti,
  Neo3Invoker,
  Signer,
  Arg,
  RpcResponseStackItem,
  EncryptedPayload,
  InvokeResult,
  DecryptFromArrayResult,
  BuiltTransaction,
  CalculateFee,
} from '@cityofzion/neon-dappkit-types'
import EventEmitter from 'events'
import TypedEventEmitter from 'typed-emitter'
/**
 * If JavaScript users try to use the connect methods without the methods, they will receive a warning.
 * This constant should be removed on later versions.
 */
const defaultMethodRemovedWarning =
  'The default value of methods has been deprecated, in future versions you will need to pass a list of method names'

export type CoreEvents = {
  session(sessions: SessionTypes.Struct | null): void | Promise<void>
}

export type Blockchain = 'neo3'

export type Chain = 'private' | 'testnet' | 'mainnet'

export type NetworkType = `${Blockchain}:${Chain}`

export type Method =
  | 'invokeFunction'
  | 'testInvoke'
  | 'signMessage'
  | 'verifyMessage'
  | 'traverseIterator'
  | 'getWalletInfo'
  | 'getNetworkVersion'
  | 'encrypt'
  | 'decrypt'
  | 'decryptFromArray'
  | 'calculateFee'
  | 'signTransaction'
  | 'wipeRequests'
  | 'withContext'

/**
 * A number that will be compared by the wallet to check if it is compatible with the dApp
 */
export const COMPATIBILITY_VERSION: number = 3
/**
 * A list of blockchains supported by wallets
 */
export const SUPPORTED_BLOCKCHAINS: Blockchain[] = ['neo3']

/**
 * The default blockchain supported by wallets
 */
export const DEFAULT_BLOCKCHAIN: Blockchain = 'neo3'
/**
 * A list of networks supported by wallets
 */
export const SUPPORTED_NETWORKS: NetworkType[] = ['neo3:private', 'neo3:testnet', 'neo3:mainnet']

/**
 * A list of auto accept methods supported by wallets
 */
export const DEFAULT_AUTO_ACCEPT_METHODS: Method[] = [
  'testInvoke',
  'getWalletInfo',
  'traverseIterator',
  'getNetworkVersion',
  'calculateFee',
  'wipeRequests',
]

export class WcSdkError extends Error {
  payload: unknown
  constructor(payload: unknown) {
    super()
    this.payload = payload
  }
}

export type WalletInfo = {
  isLedger: boolean
}

export type NetworkVersion = GetVersionResult & {
  rpcAddress: string
}

/**
 * An adapter of SignClient to work easily with Neon Wallet
 */
class WcSdk implements Neo3Invoker, Neo3Signer {
  /**
   * The WalletConnect Library
   */
  signClient: SignClient

  /**
   * The current WalletConnect connected session
   */
  private _session: SessionTypes.Struct | null = null

  /**
   * A contextual message to inform the user about method invoked
   */
  private contextualMessage: string | undefined = undefined

  /**
   * Sends a request to the blockchain
   */
  private async sendRequest(method: Method, params: any): Promise<unknown> {
    const request = {
      id: 1,
      jsonrpc: '2.0',
      method,
      params: { ...params, contextualMessage: this.contextualMessage },
    }

    delete this.contextualMessage

    return await this.signClient.request({
      topic: this.session?.topic ?? '',
      chainId: this.getChainId() ?? '',
      request,
    })
  }

  /**
   * The EventEmitter to listen for some property changes
   */
  public readonly emitter = new EventEmitter() as TypedEventEmitter<CoreEvents>

  /**
   * To initialize the adapter you need to provide the SignClient
   * @param client SignClient of the original WalletConnect library
   * @param initSession An optional existing session object
   */
  constructor(client: SignClient, initSession?: SessionTypes.Struct) {
    this.signClient = client

    if (initSession) {
      this.session = initSession
    }
  }

  get session() {
    return this._session
  }
  set session(session: SessionTypes.Struct | null) {
    this._session = session
    this.emitter.emit('session', session)
  }

  static async init(options: SignClientTypes.Options, initSession?: SessionTypes.Struct): Promise<WcSdk> {
    const client = await SignClient.init(options)
    return new WcSdk(client, initSession)
  }

  /**
   * returns if the session is connected
   */
  isConnected(): boolean {
    return !!this.session
  }

  /**
   * returns the chain id of the connected wallet
   */
  getChainId(): NetworkType | string | null {
    const info = this.getAccountInfo()
    return info && `${info[0]}:${info[1]}`
  }

  /**
   * returns the address of the connected account of the wallet
   */
  getAccountAddress(): string | null {
    const info = this.getAccountInfo()
    return info && info[2]
  }

  private getAccountInfo(): string[] | null {
    const theOnlyBlockchain = SUPPORTED_BLOCKCHAINS[0]
    const accounts = this.session?.namespaces[theOnlyBlockchain].accounts
    if (!accounts?.length) {
      return null
    }
    return accounts[0].split(':') ?? null
  }

  /**
   * subscribe to disconnect events and finishes the session
   */
  manageDisconnect(): void {
    this.signClient.events.removeAllListeners('session_delete')
    this.signClient.on('session_delete', async () => {
      this.session = null
    })
  }

  /**
   * loads the session to be used on the application
   */
  loadSession(): SessionTypes.Struct | null {
    if (this.signClient.session.values[0]) {
      this.session = this.signClient.session.values[0]
    }

    return this.session
  }

  /**
   * Executes `managePairing` and `manageDisconnect`
   * The perfect combination to be executed after the page load
   */
  async manageSession(): Promise<SessionTypes.Struct | null> {
    this.manageDisconnect()
    return this.loadSession()
  }

  /**
   * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet.
   * The difference between this method and `createConnection` is that this method will automatically open Neon connection website
   * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
   * @param methods An array of methods used on your application, choose between the methods of the documentation
   */
  async connect(network: NetworkType, methods: Method[]): Promise<SessionTypes.Struct> {
    if (methods === undefined) {
      console.warn(defaultMethodRemovedWarning)
      methods = ['invokeFunction', 'testInvoke', 'signMessage', 'verifyMessage']
    }

    const { uri, approval } = await this.createConnection(network, methods)

    if (uri) {
      window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank')?.focus()
    }

    this.session = await approval()

    return this.session
  }

  /**
   * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
   * The difference between this method and `connect` is that this method will not open Neon connection website, you will need to open it manually and await `approval` Promise to finish the connection.
   * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
   * @param methods An array of methods used on your application, choose between the methods of the documentation.
   */
  async createConnection(
    network: NetworkType,
    methods: Method[],
  ): Promise<{
    uri?: string
    approval: () => Promise<SessionTypes.Struct>
  }> {
    if (methods === undefined) {
      console.warn(defaultMethodRemovedWarning)
      methods = ['invokeFunction', 'testInvoke', 'signMessage', 'verifyMessage']
    }

    const { approval, uri } = await this.signClient.connect({
      requiredNamespaces: {
        [SUPPORTED_BLOCKCHAINS[0]]: {
          chains: [network],
          methods,
          events: [],
        },
      },
    })

    const approvalWrapper = async () => {
      const session = await approval()
      this.session = session
      return session
    }

    const uriAndWccv = `${uri}&wccv=${COMPATIBILITY_VERSION}`

    return {
      approval: approvalWrapper,
      uri: uriAndWccv,
    }
  }

  /**
   * disconnects from the wallet
   */
  async disconnect(): Promise<void> {
    if (!this.session) return

    await this.signClient.disconnect({
      topic: this.session.topic,
      reason: {
        code: 5900,
        message: 'USER_DISCONNECTED',
      },
    })

    this.session = null
  }

  /**
   * This method is used to sign a transaction.
   * @param params the contract invocation options
   * @return the call result promise
   */
  async signTransaction(params: ContractInvocationMulti | BuiltTransaction): Promise<BuiltTransaction> {
    this.validateContractInvocationMulti(params)

    const resp = await this.sendRequest('signTransaction', params)

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as BuiltTransaction
  }

  /**
   * Sends an 'invokeFunction' request to the Wallet and it will communicate with the blockchain. It will consume gas and persist data to the blockchain.
   *
   * ```
   * const invocations: ContractInvocation[] = [
   *   {
   *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
   *     operation: 'getStream',
   *     abortOnFail: true, // if 'getStream' returns false the next invocation will not be made
   *     args: [
   *       { type: 'Integer', value: 17 }
   *     ]
   *   },
   *   {
   *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
   *     operation: 'transfer',
   *     args: [
   *       { type: 'Address', value: senderAddress },
   *       { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' },
   *       { type: 'Integer', value: 100000000 },
   *       { type: 'Array', value: [] }
   *     ]
   *   }
   * ]
   *
   * const signer: Signer[] = [
   *   {
   *     scopes: 'Global'
   *   }
   * ]
   *
   * const formattedRequest: ContractInvocationMulti = {
   *   signer,
   *   invocations
   * }
   * const resp = await invokeFunction(formattedRequest)
   * ```
   *
   * @param params the contract invocation options
   * @return the call result promise. It might only contain the transactionId, another call to the blockchain might be necessary to check the result.
   */
  async invokeFunction(params: ContractInvocationMulti): Promise<string> {
    this.validateContractInvocationMulti(params)

    const resp = await this.sendRequest('invokeFunction', params)

    if (typeof resp !== 'string') {
      throw new WcSdkError(resp)
    }

    return resp as string
  }

  /**
   * This method is used to calculate a fee.
   * @param params the contract invocation options
   * @return the call result promise
   */
  async calculateFee(params: ContractInvocationMulti): Promise<CalculateFee> {
    this.validateContractInvocationMulti(params)

    const resp = await this.sendRequest('calculateFee', params)

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as CalculateFee
  }

  /**
   * Sends a `testInvoke` request to the Wallet and it will communicate with the blockchain.
   * It will not consume any gas but it will also not persist any data, this is often used to retrieve SmartContract information or check how much gas an invocation will cost.
   * Also, the wallet might choose to not ask the user authorization for test invocations making them easy to use.
   *
   * ```
   * const signers: Signer[] = [
   *   {
   *     scopes: 'None'
   *   }
   * ]
   *
   * const invocations: ContractInvocation[] = [
   *   {
   *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
   *     operation: 'getStream',
   *     abortOnFail: true, // if 'getStream' returns false the next invocation will not be made
   *     args: [
   *       { type: 'Integer', value: 17 }
   *         ],
   *   },
   *   {
   *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
   *     operation: 'balanceOf',
   *     args: [
   *       { type: 'Address', value: senderAddress }
   *     ]
   *   }
   * ]
   *
   * const formattedRequest: ContractInvocationMulti = {
   *   signers,
   *   invocations
   * }
   * const resp = await testInvoke(formattedRequest)
   * ```
   *
   * @param params the contract invocation options
   * @return the call result promise
   */
  async testInvoke(params: ContractInvocationMulti): Promise<InvokeResult> {
    this.validateContractInvocationMulti(params)

    const resp: InvokeResult = (await this.sendRequest('testInvoke', params)) as InvokeResult

    if (!resp || (resp && resp.state !== 'HALT')) {
      throw new WcSdkError(resp)
    }

    return resp
  }

  /**
   * Sends a `signMessage` request to the Wallet.
   * Signs a message
   * @param params the params to send the request
   * @return the signed message object
   */
  async signMessage(params: SignMessagePayload): Promise<SignedMessage> {
    const resp = await this.sendRequest('signMessage', params)

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as SignedMessage
  }

  /**
   * Sends a `verifyMessage` request to the Wallet.
   * Checks if the signedMessage is true
   * @param params an object that represents a signed message
   * @return true if the signedMessage is acknowledged by the account
   */
  async verifyMessage(params: SignedMessage): Promise<boolean> {
    const resp = await this.sendRequest('verifyMessage', params)

    if (resp === null || resp === undefined) {
      throw new WcSdkError(resp)
    }

    return resp as boolean
  }

  /**
   * Call the method traverseiterator on the rpc. This method is used to get the result of an iterator.
   * The result is the first count of data traversed in the Iterator, and follow-up requests will continue traversing from count + 1
   * @param sessionId the session id of the iterator
   * @param iteratorId the iterator id
   * @param count the number of items to retrieve
   * @return the call result promise
   */
  async traverseIterator(sessionId: string, iteratorId: string, count: number): Promise<RpcResponseStackItem[]> {
    const resp = await this.sendRequest('traverseIterator', [sessionId, iteratorId, count])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as RpcResponseStackItem[]
  }

  /**
   * Retrieves information about the user's wallet
   * @return wallet information
   */
  async getWalletInfo(): Promise<WalletInfo> {
    const resp = await this.sendRequest('getWalletInfo', [])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as WalletInfo
  }

  /**
   * Retrieves information about the connection network
   * @return network information
   */
  async getNetworkVersion(): Promise<NetworkVersion> {
    const resp = await this.sendRequest('getNetworkVersion', [])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as NetworkVersion
  }

  async encrypt(message: string, publicKeys: string[]): Promise<EncryptedPayload[]> {
    const resp = await this.sendRequest('encrypt', [message, publicKeys])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as EncryptedPayload[]
  }

  async decrypt(payload: EncryptedPayload): Promise<string> {
    const resp = await this.sendRequest('encrypt', [payload])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as string
  }

  async decryptFromArray(payloads: EncryptedPayload[]): Promise<DecryptFromArrayResult> {
    const resp = await this.sendRequest('decryptFromArray', [payloads])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as DecryptFromArrayResult
  }

  async wipeRequests(): Promise<string[]> {
    const resp = await this.sendRequest('wipeRequests', [])

    if (!resp) {
      throw new WcSdkError(resp)
    }

    return resp as string[]
  }

  /**
   * Sets the context message for the next method invocation in the Wallet Connect SDK.
   * @param {string} contextualMessage - A message to inform the user about the method being invoked.
   * @returns {WcSdk} - An instance of Wallet Connect with the updated context message.
   */
  withContext(contextualMessage: string): WcSdk {
    this.contextualMessage = contextualMessage
    return this
  }

  private validateContractInvocationMulti(request: ContractInvocationMulti): boolean {
    // verify fields
    this.objectValidation(request, ['signers', 'invocations'])

    // verify signers
    request.signers?.forEach((signer: Signer, i) => {
      // format scripthashes
      if (signer.allowedContracts && signer.allowedContracts.length > 0 && request.signers) {
        request.signers[i].allowedContracts = signer.allowedContracts.map((scriptHash) => {
          if (!(scriptHash.length === 42 || scriptHash.length === 40)) {
            throw new Error(`Invalid Script Hash (allowed contract): ${scriptHash}`)
          }
          return scriptHash.length === 42 ? scriptHash : `0x${scriptHash}`
        })
      }
    })

    // verify invocations
    request.invocations.forEach((invocation: ContractInvocation, i) => {
      this.objectValidation(invocation, ['scriptHash', 'operation', 'args'])

      if (!(invocation.scriptHash.length === 42 || invocation.scriptHash.length === 40)) {
        throw new Error(`Invalid Script Hash: ${invocation.scriptHash}`)
      }
      request.invocations[i].scriptHash =
        invocation.scriptHash.length === 42 ? invocation.scriptHash : `0x${invocation.scriptHash}`

      invocation.args?.forEach((arg: Arg) => {
        this.objectValidation(arg, ['type', 'value'])
      })
    })

    return true
  }

  private objectValidation(object: Arg | ContractInvocation | ContractInvocationMulti, keys: string[]): boolean {
    const objectKeys = Object.keys(object)

    keys.forEach((req) => {
      if (objectKeys.indexOf(req) < 0) {
        throw new Error(`Missing required argument field ${req} in ${req}`)
      }
    })
    return true
  }
}

// The WcSdk export is duplicated in two different ways to accommodate both CommonJS and Vite builds.
export { WcSdk }
export default WcSdk
export * from '@cityofzion/neon-dappkit-types'
