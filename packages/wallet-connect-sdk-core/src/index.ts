import Client, { CLIENT_EVENTS } from '@walletconnect/client/dist/cjs'
import { ERROR } from '@walletconnect/utils/dist/cjs/error'
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types/dist/cjs'
import { RequestArguments } from '@walletconnect/jsonrpc-utils'

/**
 * A simple interface that defines the callbacks that can be implemented
 */
export interface WcCallbacks {
    /**
     * Defines the callback for when the proposal is built so the dApp can show a QRCode to start the connection.
     *
     * ```
     * wcInstance.subscribeToEvents({
     *     onProposal: (uri: string) => {
     *         // show the QRCode, you can use @walletconnect/qrcode-modal to do so, but any QRCode presentation is fine
     *         QRCodeModal.open(uri, () => {})
     *         // alternatively you can show Neon Wallet's connection website, which is more welcoming
     *         window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank').focus();
     *     }
     * })
     * ```
     *
     * @param uri the code that will be delivered to the wallet to establish a connection
     */
    onProposal?: (uri: string) => void,
    /**
     * Defines the callback for when a pairing is created
     * @param topics
     */
    onCreated?: (topics: string[]) => void,
    /**
     * Defines a callback for when the wallet disconnects from the dApp
     *
     * ```
     * wcInstance.subscribeToEvents({
     *     onDeleted: () => {
     *         // here is where you describe a logout callback
     *         logout()
     *     }
     * })
     * ```
     *
     */
    onDeleted?: () => void
}

/**
 * A simple interface used to define the options for wallet connect interaction
 */
export interface WcConnectOptions {
    /**
     * Only necessary if you've already had a connection and wants to reconnect to it
     */
    topic?: string,
    /**
     * @deprecated Use `chains` instead
     */
    chainId?: string,
    /**
     * Defines with which chains the dApp accepts to connect to
     *
     * ```
     * ['neo3:mainnet', 'neo3:testnet', 'neo3:private']
     * ```
     *
     * The wallet will decide which chain it will use and the dApp can check the choice by calling one of the methods below:
     *
     * ```
     * // calling the static method passing a session as parameter
     * const chain = WcSdk.getChainId(session)
     * // calling the getter of an instance of WcSdk
     * const chain = wcInstance.chainId
     * ```
     *
     */
    chains?: string[],
    /**
     * the dApp metadata to be shown on the wallet
     *
     * ```
     * {
     *     name: "My dApp Name",
     *     description: "This is the dApp description",
     *     url: "https://mydappwebsite.com/",
     *     icons: ["https://mydappwebsite.com/icon.png"]
     * }
     * ```
     *
     */
    appMetadata: AppMetadata,
    /**
     * Which methods the dApp needs authorization to call
     *
     * ```
     * [
     *     'invokeFunction', // makes real invocations that persist data on the blockchain
     *     'testInvoke', // makes test invocations that don't require user authorization, often used to retrieve information provided by the SmartContract
     *     // You can also provide any other method name present on the RpcServer, eg.:
     *     'getversion'
     * ]
     * ```
     *
     */
    methods: string[]
}


const SUPPORTED_ARG_TYPES = ["Any", "Signature", "Boolean", "Integer", "Hash160", "Address", "Null", "Hash256",
    "ByteArray", "PublicKey", "String", "ByteString", "Array", "Buffer", "InteropInterface", "Void"] as const
/**
 * A list of types supported by wallets
 */
type ArgType = typeof SUPPORTED_ARG_TYPES[number]

/**
 * An argument for a contract invocation.
 */
export interface Argument {
    type: ArgType,
    value: string | number | boolean
}

/**
 * The result format of a call of a method on the wallet
 */
export interface RpcCallResult<T> {
    /**
     * Which method was called
     */
    method: string,
    /**
     * The result object
     */
    result: T,
}

/**
 * An Enum that represents the different Signature Scopes of an invocation
 */
export enum WitnessScope {
    None = 0,
    CalledByEntry = 1,
    CustomContracts = 16,
    CustomGroups = 32,
    Global = 128
}

/**
 * A simple interface that defines the signing options, which privileges the user needs to give for the SmartContract.
 * Usually the default signer is enough: `{ scope: WitnessScope.CalledByEntry }`
 * But you may need additional authorization, for instance, allow the SmartContract to invoke another specific contract:
 *
 * ```
 * {
 *   scope: WitnessScope.CustomContracts,
 *   allowedContracts: ['0xf970f4ccecd765b63732b821775dc38c25d74f23']
 * }
 * ```
 *
 */
export type Signer = {
    /**
     * The level of permission the invocation needs
     */
    scope: WitnessScope
    /**
     * When the scope is `WitnessScope.CustomContracts`, you need to specify which contracts are allowed
     */
    allowedContracts?: string[]
    /**
     * When the scope is `WitnessScope.CustomGroups`, you need to specify which groups are allowed
     */
    allowedGroups?: string[]
}

/**
 * A simple interface that defines the invocation options
 */
export type ContractInvocation = {
    /**
     * The SmartContract ScriptHash
     */
    scriptHash: string
    /**
     * The SmartContract's method name
     */
    operation: string
    /**
     * The parameters to be sent to the method
     */
    args: Argument[]
    /**
     * When calling `multiInvoke`, you can set `abortOnFail` to true on some invocations so the VM will abort the rest of the calls if this invocation returns `false`
     */
    abortOnFail?: boolean
    /**
     * the signing options
     */
    signer?: Signer
}

/**
 * A simple interface that defines the MultiInvoke options
 */
export type ContractInvocationMulti = {
    /**
     * the signing options
     */
    signer: Signer[]
    /**
     * The array of invocations
     */
    invocations: ContractInvocation[]
}

/**
 * A simple interface that defines the Signed Message format
 */
export type SignedMessage = {
    /**
     * signer's public key
     */
    publicKey: string

    /**
     * encrypted message
     */
    data: string

    /**
     * salt used to encrypt
     */
    salt: string

    /**
     * message hex
     */
    messageHex: string
}

/**
 * The main class that exposes all Wallet Connect operations to allow such interaction.
 * It exposes static methods and instance methods, is up to the developer to choose which approach fits better it's needs.
 *
 * ```
 * // you can call the constructor to have an instance with it's own state
 * const wcInstance = new WcSdk()
 * // and call the methods directly from it, eg.:
 * wcInstance.initClient(...)
 * wcInstance.loadSession(...)
 *
 * // Or alternatively you can use the static methods and store the wcClient and session by yourself, eg.:
 * const wcClient = WcSdk.initClient(...)
 * const session = wcInstance.loadSession(...)
 * // the downside of this approach is that you will have to pass wcClient and session as parameter on most of the methods
 * ```
 *
 */
export class WcSdk {
    /**
     * Wallet Connect Client, used on most of the methods
     */
    wcClient?: Client

    /**
     * The Session of the current connection
     */
    session?: SessionTypes.Created

    /**
     * Initializes the SDK, it's the first method to be called
     * @param logger the logger level, describes how much information to show on the log, use `debug` for more information or `error` for less information
     * @param relayServer the relayserver to connect to, it needs to be the same relay server of the wallet. It's recommended to use `wss://relay.walletconnect.org`
     */
    async initClient (logger: string, relayServer: string): Promise<void> {
        this.wcClient = await WcSdk.initClient(logger, relayServer)
    }

    /**
     * Subscribe to Wallet Connect events
     *
     * ```
     * wcInstance.subscribeToEvents({
     *     onProposal: (uri: string) => {
     *         // show the QRCode, you can use @walletconnect/qrcode-modal to do so, but any QRCode presentation is fine
     *         QRCodeModal.open(uri, () => {})
     *         // alternatively you can show Neon Wallet Connect's website, which is more welcoming
     *         window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank').focus();
     *     },
     *     onDeleted: () => {
     *         // here is where you describe a logout callback
     *         logout()
     *     }
     * })
     * ```
     *
     */
    subscribeToEvents (callbacks?: WcCallbacks): void {
        WcSdk.subscribeToEvents(this.wcClient, callbacks)
    }

    /**
     * Load any existing connection, it should be called after the initialization, to reestablish connections made previously
     */
    async loadSession (): Promise<void> {
        if (this.wcClient) {
            this.session = await WcSdk.getSession(this.wcClient) || undefined
        }
    }

    /**
     * Start the process of establishing a new connection, to be used when there is no `wcInstance.session`
     * @param options describes the options for the connection
     */
    async connect (options: WcConnectOptions): Promise<void> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        this.session = await WcSdk.connect(this.wcClient, options)
    }

    /**
     * gets the address of the connected account
     * @param accountIndex the index of the account to retrieve, gets the first account if no index is provided
     * @return the address of the connected account of the wallet
     */
    getAccountAddress (accountIndex?: number): string | null {
        return this.session ? WcSdk.getAccountAddress(this.session, accountIndex) : null
    }

    /**
     * gets the chain id of the first connected account, to retrieve this information from another account use `WcSdk.getAccountInfo` static method.
     * @return a string that represents the blockchain
     */
    get chainId (): string | null {
        return this.session ? WcSdk.getChainId(this.session) : null
    }

    /**
     * gets the address of the first connected account, to retrieve this information from another account use `getAccountAddress` method.
     * @return a string that represents the blockchain
     */
    get accountAddress (): string | null {
        return this.session ? WcSdk.getAccountAddress(this.session) : null
    }

    /**
     * Disconnects from the Wallet, use this method to logout
     */
    async disconnect (): Promise<void> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        await WcSdk.disconnect(this.wcClient, this.session)
    }

    /**
     * Sends a request to the Wallet and it will call the RpcServer
     *
     * ```
     * const result = await wcInstance.sendRequest({
     *   method: 'getapplicationlog',
     *   params: ['0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c']
     * })
     * ```
     *
     * @param request the request information object containing the rpc method name and the parameters
     * @return the call result promise
     */
    async sendRequest (request: RequestArguments): Promise<RpcCallResult<any>> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.sendRequest(this.wcClient, this.session, this.chainId, request)
    }

    /**
     * Sends an 'invokefunction' request to the Wallet and it will communicate with the blockchain. It will consume gas and persist data to the blockchain.
     *
     * ```
     * const senderAddress = wcInstance.getAccountAddress()
     *
     * const from = { type: 'Address', value: senderAddress }
     * const recipient = { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' }
     * const value = { type: 'Integer', value: 100000000 }
     * const args = { type: 'Array', value: [] }
     *
     * const resp = await wcInstance.invokeFunction({
     *    scriptHash: smartContractScripthash,
     *    operation: 'transfer',
     *    args: [from, recipient, value, args]
     * })
     * ```
     *
     * @param request the contract invocation options
     * @param signer: The contract signer. For multiple signers, pass an array.
     * @return the call result promise. It might only contain the transactionId, another call to the blockchain might be necessary to check the result.
     */
    async invokeFunction (request: ContractInvocation | ContractInvocation[], signer: Signer  | Signer[]): Promise<RpcCallResult<any>> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }

        const formattedRequest: ContractInvocationMulti = {
            signer: Array.isArray(signer) ? signer : [signer],
            invocations: Array.isArray(request) ? request : [request]
        }
        return await WcSdk.invokeFunction(this.wcClient, this.session, this.chainId, formattedRequest)
    }

    /**
     * Sends a `testInvoke` request to the Wallet and it will communicate with the blockchain.
     * It will not consume any gas but it will also not persist any data, this is often used to retrieve SmartContract information or check how much gas an invocation will cost.
     * Also, the wallet might choose to not ask the user authorization for test invocations making them easy to use.
     *
     * ```
     *
     * const signer = {
     *     scope: 128
     * }
     * const resp = await wcInstance.testInvoke({
     *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *     operation: 'getStream',
     *     args: [{ type: 'Integer', value: 17 }]
     *     }, signer
     * )
     * ```
     *
     * @param request The contract invocation options. For multiple invocations, pass an array.
     * @param signer: The contract signer. For multiple signers, pass an array.
     * @return the call result promise
     */
    async testInvoke (request: ContractInvocation | ContractInvocation[], signer: Signer | Signer[]): Promise<RpcCallResult<any>> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }

        const formattedRequest: ContractInvocationMulti = {
            signer: Array.isArray(signer) ? signer : [signer],
            invocations: Array.isArray(request) ? request : [request]
        }
        return await WcSdk.testInvoke(this.wcClient, this.session, this.chainId, formattedRequest)
    }

    /**
     * Sends a `signMessage` request to the Wallet.
     * Signs a message
     * @param message the message to be signed
     * @return the signed message object
     */
    async signMessage (message: string): Promise<RpcCallResult<SignedMessage>> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.signMessage(this.wcClient, this.session, this.chainId, message)
    }

    /**
     * Sends a `verifyMessage` request to the Wallet.
     * Checks if the signedMessage is true
     * @param signedMessage an object that represents a signed message
     * @return true if the signedMessage is acknowledged by the account
     */
    async verifyMessage (signedMessage: SignedMessage): Promise<RpcCallResult<boolean>> {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.verifyMessage(this.wcClient, this.session, this.chainId, signedMessage)
    }

    /**
     * Initializes the SDK, it's the first method to be called
     * @param logger the logger level, describes how much information to show on the log, use `debug` for more information or `error` for less information
     * @param relayProvider the relayProvider to connect to, it needs to be the same relay server of the wallet. It's recommended to use `wss://relay.walletconnect.org`
     * @return a wcClient
     */
    static async initClient (logger: string, relayProvider: string): Promise<Client> {
        return await Client.init({
            logger,
            relayProvider
        })
    }

    /**
     * Subscribe to Wallet Connect events
     *
     * ```
     * WcSdk.subscribeToEvents(wcClient, {
     *     onProposal: (uri: string) => {
     *         // show the QRCode, you can use @walletconnect/qrcode-modal to do so, but any QRCode presentation is fine
     *         QRCodeModal.open(uri, () => {})
     *         // alternatively you can show Neon Wallet Connect's website, which is more welcoming
     *         window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank').focus();
     *     },
     *     onDeleted: () => {
     *         // here is where you describe a logout callback
     *         logout()
     *     }
     * })
     * ```
     *
     */
    static subscribeToEvents (wcClient?: Client, callbacks?: WcCallbacks): void {
        if (!wcClient) {
            throw Error('The client was not initialized')
        }

        wcClient.on(
          CLIENT_EVENTS.pairing.proposal,
          async (proposal: PairingTypes.Proposal) => {
              const { uri } = proposal.signal.params

              if (callbacks && callbacks.onProposal) {
                  callbacks.onProposal(uri)
              }
          }
        )

        wcClient.on(CLIENT_EVENTS.pairing.created, async () => {
            if (callbacks && callbacks.onCreated) {
                callbacks.onCreated(wcClient.pairing.topics)
            }
        })

        wcClient.on(CLIENT_EVENTS.session.deleted, async (session: SessionTypes.Settled) => {
            if (session.topic !== session?.topic) return

            if (callbacks && callbacks.onDeleted) {
                callbacks.onDeleted()
            }
        })
    }

    /**
     * Gets any existing connection, it should be called after the initialization, to retrieve the session of connections made previously
     */
    static async getSession (wcClient: Client): Promise<SessionTypes.Settled | null> {
        if (wcClient?.session.topics.length) {
            return await wcClient.session.get(wcClient.session.topics[0])
        } else {
            return null
        }
    }

    /**
     * gets the information of a connected account
     * @param session connection session
     * @param accountIndex index of one of the connected accounts
     * @return an array that represents the address and chain
     */
    static getAccountInfo (session: SessionTypes.Settled, accountIndex?: number): string[] | null {
        const index = accountIndex ?? 0
        if (session.state.accounts.length <= index) {
            return null
        }
        return session.state.accounts[index].split(':')
    }

    /**
     * gets the address of the connected account
     * @param session connection session
     * @param accountIndex the index of the account to retrieve, gets the first account if no index is provided
     * @return the address of the connected account of the wallet
     */
    static getAccountAddress (session: SessionTypes.Settled, accountIndex?: number): string | null {
        const info = WcSdk.getAccountInfo(session, accountIndex)
        return info && info[2]
    }

    /**
     * gets the chain id of the first connected account, to retrieve this information from another account use `WcSdk.getAccountInfo` static method.
     * @param session connection session
     * @param accountIndex the index of the account to retrieve, gets the first account if no index is provided
     * @return a string that represents the blockchain
     */
    static getChainId (session: SessionTypes.Settled, accountIndex?: number): string | null {
        const info = WcSdk.getAccountInfo(session, accountIndex)
        return info && `${info[0]}:${info[1]}`
    }

    /**
     * Start the process of establishing a new connection, to be used when there is no `wcInstance.session`
     * @param wcClient
     * @param options describes the options for the connection
     */
    static async connect (wcClient: Client, options: WcConnectOptions): Promise<SessionTypes.Settled> {
        return await wcClient.connect({
            metadata: options.appMetadata,
            pairing: options.topic ? { topic: options.topic } : undefined,
            permissions: {
                blockchain: {
                    chains: options.chains ?? (options.chainId ? [options.chainId] : [])
                },
                jsonrpc: {
                    methods: options.methods,
                },
            },
        })
    }

    /**
     * Disconnects from the Wallet, use this method to logout
     * @param wcClient
     * @param session connected session
     */
    static async disconnect (wcClient: Client, session: SessionTypes.Created): Promise<void> {
        await wcClient.disconnect({
            topic: session.topic,
            reason: ERROR.USER_DISCONNECTED.format(),
        })
    }

    /**
     * Sends a request to the Wallet and it will call the RpcServer
     *
     * ```
     * const result = await WcSdk.sendRequest(wcClient, session, chainId, {
     *   method: 'getapplicationlog',
     *   params: ['0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c']
     * })
     * ```
     *
     * @param wcClient
     * @param session connected session
     * @param chainId the chosen blockchain id to make the request, must be one of the blockchains authorized by the wallet
     * @param request the request information object containing the rpc method name and the parameters
     * @return the call result promise
     */
    static async sendRequest (wcClient: Client, session: SessionTypes.Created, chainId: string, request: RequestArguments): Promise<RpcCallResult<any>> {
        try {
            const result = await wcClient.request({
                topic: session.topic,
                chainId,
                request,
            })

            return {
                method: request.method,
                result,
            }
        } catch (error) {
            return {
                method: request.method,
                result: { error },
            }
        }
    }

    /**
     * Sends an 'invokefunction' request to the Wallet and it will communicate with the blockchain. It will consume gas and persist data to the blockchain.
     *
     * ```
     * const senderAddress = WcSdk.getAccountAddress(session)
     *
     * const from = { type: 'Address', value: senderAddress }
     * const recipient = { type: 'Address', value: 'NbnjKGMBJzJ6j5PHeYhjJDaQ5Vy5UYu4Fv' }
     * const value = { type: 'Integer', value: 100000000 }
     * const args = { type: 'Array', value: [] }
     *
     * const resp = await WcSdk.invokeFunction(wcClient, session, chainId, {
     *    signer: [{ scopes: WitnessScope.None }],
     *    invocations: [{
     *        scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *        operation: 'getStream',
     *        abortOnFail: true, // if 'getStream' returns false the next invocation will not be made
     *        args: [{ type: 'Integer', value: 17 }],
     *    }, {
     *        scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *        operation: 'transfer',
     *        args: [from, recipient, value, args]
     *    }]
     * })
     * ```
     *
     * @param wcClient
     * @param session connected session
     * @param chainId the chosen blockchain id to make the request, must be one of the blockchains authorized by the wallet
     * @param request the contract invocation options
     * @return the call result promise. It might only contain the transactionId, another call to the blockchain might be necessary to check the result.
     */
    static async invokeFunction (wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocationMulti): Promise<RpcCallResult<any>> {
        WcSdk.certifyInvocationPayload(request)
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'invokeFunction',
            params: request,
        })
    }

    /**
     * Sends a `testInvoke` request to the Wallet and it will communicate with the blockchain.
     * It will not consume any gas but it will also not persist any data, this is often used to retrieve SmartContract information or check how much gas an invocation will cost.
     * Also, the wallet might choose to not ask the user authorization for test invocations making them easy to use.
     *
     * ```
     * const resp = await WcSdk.testInvoke(wcClient, session, chainId, {
     *    signer: [{ scopes: WitnessScope.None }],
     *    invocations: [{
     *        scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *        operation: 'getStream',
     *        abortOnFail: true, // if 'getStream' returns false the next invocation will not be made
     *        args: [{ type: 'Integer', value: 17 }],
     *    }, {
     *        scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *        operation: 'transfer',
     *        args: [from, recipient, value, args]
     *    }]
     * })
     * ```
     *
     * @param wcClient
     * @param session connected session
     * @param chainId the chosen blockchain id to make the request, must be one of the blockchains authorized by the wallet
     * @param request the contract invocation options
     * @return the call result promise
     */
    static async testInvoke (wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocationMulti): Promise<RpcCallResult<any>> {
        WcSdk.certifyInvocationPayload(request)
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'testInvoke',
            params: request,
        })
    }

    /**
     * Sends a `signMessage` request to the Wallet.
     * Signs a message
     * @param wcClient
     * @param session connected session
     * @param chainId the chosen blockchain id to make the request, must be one of the blockchains authorized by the wallet
     * @param message the message to be signed
     * @return the signed message object
     */
    static async signMessage (wcClient: Client, session: SessionTypes.Created, chainId: string, message: string): Promise<RpcCallResult<SignedMessage>> {
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'signMessage',
            params: message,
        })
    }

    /**
     * Sends a `verifyMessage` request to the Wallet.
     * Checks if the signedMessage is true
     * @param wcClient
     * @param session connected session
     * @param chainId the chosen blockchain id to make the request, must be one of the blockchains authorized by the wallet
     * @param signedMessage an object that represents a signed message
     * @return true if the signedMessage is acknowledged by the account
     */
    static async verifyMessage (wcClient: Client, session: SessionTypes.Created, chainId: string, signedMessage: SignedMessage): Promise<RpcCallResult<boolean>> {
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'verifyMessage',
            params: signedMessage,
        })
    }

    /**
     * Verifies a contract invocation payload
     * @param request
     */
    static certifyInvocationPayload(request: ContractInvocationMulti): boolean {
        //verify signers
        request.signer.forEach( (signer: Signer) => {
            if (!(signer.scope in WitnessScope)) {
                throw new Error(`Invalid signature scope: ${signer.scope}`)
            }
        })
        //verify argument types
        request.invocations.forEach((invocation: ContractInvocation) => {
            invocation.args.forEach( (arg: Argument) => {
                if (typeof arg.type == 'string' && SUPPORTED_ARG_TYPES.includes(arg.type)) {
                    return
                }
                throw new Error(`Invalid argument type: ${arg.type}`)
            })
        })

        return true
    }
}
