import { writable, type Writable, type Readable, derived } from 'svelte/store'
import SignClient from '@walletconnect/sign-client'
import { CoreEvents, WcSdk } from '@cityofzion/wallet-connect-sdk-core'
import type {
  NetworkType,
  Method,
  Neo3Invoker,
  Neo3Signer,
  BuiltTransaction,
  CalculateFee,
  ContractInvocationMulti,
  InvokeResult,
  RpcResponseStackItem,
  DecryptFromArrayResult,
  EncryptedPayload,
  SignMessagePayload,
  SignedMessage,
  NetworkVersion,
  WalletInfo,
} from '@cityofzion/wallet-connect-sdk-core'
import type { SessionTypes, SignClientTypes } from '@walletconnect/types'
import TypedEventEmitter from 'typed-emitter'
import { EventEmitter } from 'events'

export interface IWalletConnectStore extends Neo3Invoker, Neo3Signer {
  /**
   * The WalletConnect Library
   */
  signClient: Readable<SignClient | null>

  /**
   * The current WalletConnect connected session
   */
  session: Readable<SessionTypes.Struct | null>
  setSession(session: SessionTypes.Struct): void

  /**
   * The current WalletConnect event emitter
   */
  emitter: TypedEventEmitter<CoreEvents>

  /**
   * returns if the session is connected
   */
  readonly isConnected: () => boolean

  /**
   * returns the chain id of the connected wallet
   */
  getChainId: () => NetworkType | string | null

  /**
   * returns the address of the connected account of the wallet
   */
  getAccountAddress: () => string | null

  /**
   * subscribe to disconnect events and finishes the session
   */
  manageDisconnect: () => void
  loadSession: () => void

  /**
   * Executes `managePairing` and `manageDisconnect`
   * The perfect combination to be executed after the page load
   */
  manageSession: () => void

  /**
   * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet.
   * The difference between this method and `createConnection` is that this method will automatically open Neon connection website and save the session state
   * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
   * @param methods An array of methods used on your application, choose between the methods of the documentation
   */
  connect: (network: NetworkType, methods: Method[]) => Promise<void>

  /**
   * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet.
   * The difference between this method and `connect` is that this method will not open Neon connection website and will not save the session state
   * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
   * @param methods An array of methods used on your application, choose between the methods of the documentation
   */
  createConnection: (
    network: NetworkType,
    methods: Method[],
  ) => Promise<{
    uri?: string
    approval: () => Promise<SessionTypes.Struct>
  }>

  /**
   * disconnects from the wallet
   */
  disconnect: () => Promise<void>

  /**
   * Sends a `signMessage` request to the Wallet.
   * Signs a message
   * @param params the params to send the request
   * @return the signed message object
   */
  signMessage: (params: SignMessagePayload) => Promise<SignedMessage>

  /**
   * Sends a `verifyMessage` request to the Wallet.
   * Checks if the signedMessage is true
   * @param params an object that represents a signed message
   * @return true if the signedMessage is acknowledged by the account
   */
  verifyMessage: (params: SignedMessage) => Promise<boolean>

  /**
   * Retrieves information about the user's wallet
   * @return wallet information
   */
  getWalletInfo: () => Promise<WalletInfo>

  /**
   * Retrieves information about the connection network
   * @return network information
   */
  getNetworkVersion: () => Promise<NetworkVersion>

  withContext: (contextualMessage: string) => WcSdk
}

export class WCSDKStore implements IWalletConnectStore {
  private sdk: WcSdk | null
  private sessionWritable: Writable<SessionTypes.Struct | null> = writable(null)
  private signClientWritable: Writable<SignClient | null> = writable(null)
  private autoManageSession: boolean
  emitter = new EventEmitter() as TypedEventEmitter<CoreEvents>

  constructor(options: SignClientTypes.Options, autoManageSession?: boolean) {
    this.sdk = null
    this.setupWcClient(options)
    this.autoManageSession = autoManageSession ?? true
  }

  setSession(session: SessionTypes.Struct): void {
    this.sessionWritable.set(session)
  }
  isConnected(): boolean {
    return this.sdk?.isConnected() ?? false
  }
  getChainId(): string | null {
    return this.sdk?.getChainId() ?? null
  }
  manageDisconnect(): void {
    this.signClientWritable.subscribe((signClient) => {
      if (signClient) {
        //@ts-ignore
        signClient.events.removeAllListeners()
        signClient.on('session_delete', async () => {
          this.sessionWritable.set(null)
        })
      }
    })
  }
  loadSession(): void {
    const session = this.sdk?.loadSession() ?? null
    if (session) {
      this.sessionWritable.set(session)
    }
  }
  manageSession(): void {
    this.manageDisconnect()
    this.loadSession()
  }
  async createConnection(
    network: 'neo3:private' | 'neo3:testnet' | 'neo3:mainnet',
    methods: Method[],
  ): Promise<{ uri?: string | undefined; approval: () => Promise<SessionTypes.Struct> }> {
    return await this.SdkOrError.createConnection(network, methods)
  }
  async disconnect(): Promise<void> {
    await this.SdkOrError.disconnect()
    this.sessionWritable.set(null)
  }
  async getWalletInfo(): Promise<WalletInfo> {
    return await this.SdkOrError.getWalletInfo()
  }
  async getNetworkVersion(): Promise<NetworkVersion> {
    return await this.SdkOrError.getNetworkVersion()
  }
  async invokeFunction(cimOrBt: ContractInvocationMulti | BuiltTransaction): Promise<string> {
    return await this.SdkOrError.invokeFunction(cimOrBt)
  }
  async testInvoke(cim: ContractInvocationMulti | BuiltTransaction): Promise<InvokeResult<RpcResponseStackItem>> {
    return await this.SdkOrError.testInvoke(cim)
  }
  async traverseIterator(sessionId: string, iteratorId: string, count: number): Promise<RpcResponseStackItem[]> {
    return await this.SdkOrError.traverseIterator(sessionId, iteratorId, count)
  }
  async signTransaction(cim: ContractInvocationMulti | BuiltTransaction): Promise<BuiltTransaction> {
    return await this.SdkOrError.signTransaction(cim)
  }
  async calculateFee(cim: ContractInvocationMulti): Promise<CalculateFee> {
    return await this.SdkOrError.calculateFee(cim)
  }
  async signMessage(params: SignMessagePayload): Promise<SignedMessage> {
    return this.SdkOrError.signMessage(params)
  }
  async verifyMessage(params: SignedMessage): Promise<boolean> {
    return await this.SdkOrError.verifyMessage(params)
  }
  getAccountAddress(): string | null {
    return this.SdkOrError.getAccountAddress()
  }
  async encrypt(message: string, publicKeys: string[]): Promise<EncryptedPayload[]> {
    return await this.SdkOrError.encrypt(message, publicKeys)
  }
  async decrypt(payload: EncryptedPayload): Promise<string> {
    return await this.SdkOrError.decrypt(payload)
  }
  async decryptFromArray(payloads: EncryptedPayload[]): Promise<DecryptFromArrayResult> {
    return await this.SdkOrError.decryptFromArray(payloads)
  }

  async connect(network: NetworkType, methods: Method[]) {
    const result = await this.SdkOrError.connect(network, methods)
    this.sessionWritable.set(result)
  }

  async wipeRequests(): Promise<string[]> {
    return await this.SdkOrError.wipeRequests()
  }

  withContext(contextualMessage: string): WcSdk {
    return this.SdkOrError.withContext(contextualMessage)
  }

  get session() {
    return derived(this.sessionWritable, (session) => session)
  }

  get signClient() {
    return derived(this.signClientWritable, (signClient) => signClient)
  }

  private async setupWcClient(options: SignClientTypes.Options) {
    this.sdk = await WcSdk.init(options)
    this.sdk.emitter.removeAllListeners()
    this.sdk.emitter.on('session', (session) => {
      this.emitter.emit('session', session)
      this.sessionWritable.set(session ?? null)
    })

    const signClient = this.sdk.signClient

    if (this.autoManageSession) {
      this.manageSession()
    }
    this.signClientWritable.set(signClient)
  }

  private get SdkOrError() {
    if (this.sdk === null) {
      throw new Error('no client')
    } else {
      return this.sdk
    }
  }
}
