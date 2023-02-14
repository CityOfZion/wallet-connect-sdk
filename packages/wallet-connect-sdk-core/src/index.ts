import SignClient from '@walletconnect/sign-client'
import { SessionTypes } from '@walletconnect/types'
import { InvokeResult } from '@cityofzion/neon-core/lib/rpc'
import { ContractInvocation, ContractInvocationMulti, Neo3Invoker, Signer, Arg, StackItemJson } from '@cityofzion/neo3-invoker'
import { Neo3Signer, SignMessagePayload, SignedMessage } from '@cityofzion/neo3-signer'

/**
 * A number that will be compared by the wallet to check if it is compatible with the dApp
 */
export const COMPATIBILITY_VERSION = 2
/**
 * A list of blockchains supported by wallets
 */
export const SUPPORTED_BLOCKCHAINS = ['neo3'] as const
/**
 * A list of networks supported by wallets
 */
export const SUPPORTED_NETWORKS = ['neo3:private', 'neo3:testnet', 'neo3:mainnet'] as const
/**
 * A list of methods supported by wallets
 */
export const SUPPORTED_METHODS = [
    'invokeFunction',
    'testInvoke',
    'signMessage',
    'verifyMessage',
    "traverseIterator"
] as const
/**
 * A list of argument types supported by wallets
 */
export const SUPPORTED_ARG_TYPES = ['Any', 'Signature', 'Boolean', 'Integer', 'Hash160', 'Address', 'ScriptHash', 'Null', 'Hash256',
    'ByteArray', 'PublicKey', 'String', 'ByteString', 'Array', 'Buffer', 'InteropInterface', 'Void'] as const
/**
 * A list of networks supported by wallets
 */
export type NetworkType = typeof SUPPORTED_NETWORKS[number]

export class WcSdkError extends Error {
    payload: unknown
    constructor (payload: unknown) {
        super()
        this.payload = payload
    }
}

/**
 * An adapter of SignClient to work easily with Neon Wallet
 */
export default class WcSdk implements Neo3Invoker, Neo3Signer {
    /**
     * The WalletConnect Library
     */
    signClient: SignClient

    /**
     * The current WalletConnect connected session
     */
    session: SessionTypes.Struct | null = null

    /**
     * To initialize the adapter you need to provide the SignClient
     * @param client SignClient of the original WalletConnect library
     * @param initSession An optional existing session object
     */
    constructor (client: SignClient, initSession?: SessionTypes.Struct) {
        this.signClient = client
        if (initSession) {
            this.session = initSession
        }
    }

    /**
     * returns if the session is connected
     */
    isConnected (): boolean {
        return !!this.session
    }

    /**
    * Call the method traverseiterator on the rpc. This method is used to get the result of an iterator.
    * The result is the first count of data traversed in the Iterator, and follow-up requests will continue traversing from count + 1
    * @param sessionId the session id of the iterator
    * @param iteratorId the iterator id
    * @param count the number of items to retrieve
    * @return the call result promise
    */
    async traverseIterator(
        sessionId: string,
        iteratorId: string,
        count: number
    ): Promise<StackItemJson[]> {
        const request = {
        id: 1,
        jsonrpc: "2.0",
        method: "traverseIterator",
        params: [sessionId, iteratorId, count],
        };

        const resp = await this.signClient.request({
        topic: this.session?.topic ?? "",
        chainId: this.getChainId() ?? "",
        request,
        });

        if (!resp) {
        throw new WcSdkError(resp);
        }

        return resp as StackItemJson[];
    }

    /**
     * returns the chain id of the connected wallet
     */
    getChainId (): NetworkType | string | null {
        const info = this.getAccountInfo()
        return info && `${info[0]}:${info[1]}`
    }

    /**
     * returns the address of the connected account of the wallet
     */
    getAccountAddress (): string | null {
        const info = this.getAccountInfo()
        return info && info[2]
    }

    private getAccountInfo (): string[] | null {
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
    manageDisconnect (): void {
        this.signClient.on('session_delete', async () => {
            this.session = null
        })
    }

    /**
     * loads the session to be used on the application
     */
    loadSession (): SessionTypes.Struct | null {
        if (this.signClient.session.values[0]) {
            this.session = this.signClient.session.values[0]
        }

        return this.session
    }

    /**
     * Executes `managePairing` and `manageDisconnect`
     * The perfect combination to be executed after the page load
     */
    async manageSession (): Promise<SessionTypes.Struct | null> {
        this.manageDisconnect()
        return this.loadSession()
    }

    /**
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet.
     * The difference between this method and `createConnection` is that this method will automatically open Neon connection website
     * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
     * @param methods An array of methods used on your application, choose between 'invokeFunction', 'testInvoke', 'signMessage' or 'verifyMessage'. Leave it empty to use all methods.
     */
    async connect(network: NetworkType, methods: string[] = [...SUPPORTED_METHODS]): Promise<SessionTypes.Struct> {
        const { uri, approval } = await this.createConnection(network, methods)

        if (uri) {
            const uriAndWccv = `${uri}&wccv=${COMPATIBILITY_VERSION}`
            window.open(`https://neon.coz.io/connect?uri=${uriAndWccv}`, '_blank')?.focus()
        }

        this.session = await approval()

        return this.session
    }

    /**
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
     * The difference between this method and `connect` is that this method will not open Neon connection website, you will need to open it manually and await `approval` Promise to finish the connection.
     * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
     * @param methods An array of methods used on your application, choose between 'invokeFunction', 'testInvoke', 'signMessage' or 'verifyMessage'. Leave it empty to use all methods.
     */
    async createConnection (network: NetworkType, methods: string[] = [...SUPPORTED_METHODS]): Promise<{ uri?: string, approval: () => Promise<SessionTypes.Struct>}> {
        return await this.signClient.connect({
            requiredNamespaces: {
                [SUPPORTED_BLOCKCHAINS[0]]: {
                    chains: [network],
                    methods,
                    events: []
                }
            }
        })
    }

    /**
     * disconnects from the wallet
     */
    async disconnect (): Promise<void> {
        if (!this.session) return

        await this.signClient.disconnect({
            topic: this.session.topic,
            reason: { code: 5900, message: 'USER_DISCONNECTED' }
        })

        this.session = null
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
    async invokeFunction (params: ContractInvocationMulti): Promise<string> {
        this.validateContractInvocationMulti(params)

        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'invokeFunction',
            params
        }

        const resp: unknown = await this.signClient.request({
            topic: this.session?.topic ?? '',
            chainId: this.getChainId() ?? '',
            request
        })

        if (typeof resp !== 'string') {
            throw new WcSdkError(resp)
        }

        return resp as string
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
    async testInvoke (params: ContractInvocationMulti): Promise<InvokeResult> {
        this.validateContractInvocationMulti(params)

        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'testInvoke',
            params
        }

        const resp: InvokeResult | null = await this.signClient.request({
            topic: this.session?.topic ?? '',
            chainId: this.getChainId() ?? '',
            request
        })

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
    async signMessage (params: SignMessagePayload): Promise<SignedMessage> {
        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'signMessage',
            params
        }

        const resp = await this.signClient.request({
            topic: this.session?.topic ?? '',
            chainId: this.getChainId() ?? '',
            request
        })

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
    async verifyMessage (params: SignedMessage): Promise<boolean> {
        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'verifyMessage',
            params
        }

        const resp = await this.signClient.request({
            topic: this.session?.topic ?? '',
            chainId: this.getChainId() ?? '',
            request
        })

        if (resp === null || resp === undefined) {
            throw new WcSdkError(resp)
        }

        return resp as boolean
    }

    private validateContractInvocationMulti (request: ContractInvocationMulti): boolean {
        // verify fields
        this.objectValidation(request, ['signers', 'invocations'])

        // verify signers
        request.signers.forEach((signer: Signer, i) => {
            // format scripthashes
            if (signer.allowedContracts && signer.allowedContracts.length > 0) {
                request.signers[i].allowedContracts = signer.allowedContracts.map((scriptHash) => {
                    if (!(scriptHash.length === 42 || scriptHash.length === 40)) {
                        throw new Error(`Invalid Script Hash (allowed contract): ${scriptHash}`)
                    }
                    return (scriptHash.length === 42) ? scriptHash : `0x${scriptHash}`
                })
            }
        })

        // verify invocations
        request.invocations.forEach((invocation: ContractInvocation, i) => {
            this.objectValidation(
              invocation,
              ['scriptHash', 'operation', 'args']
            )

            if (!(invocation.scriptHash.length === 42 || invocation.scriptHash.length === 40)) {
                throw new Error(`Invalid Script Hash: ${invocation.scriptHash}`)
            }
            request.invocations[i].scriptHash = (invocation.scriptHash.length === 42)
              ? invocation.scriptHash : `0x${invocation.scriptHash}`

            invocation.args.forEach((arg: Arg) => {
                this.objectValidation(
                  arg,
                  ['type', 'value']
                )

                if (SUPPORTED_ARG_TYPES.includes(arg.type)) {
                    return
                }
                throw new Error(`Invalid argument type: ${arg.type}`)
            })
        })

        return true
    }

    private objectValidation (object: Arg | ContractInvocation | ContractInvocationMulti, keys: string[]): boolean {
        const objectKeys = Object.keys(object)

        keys.forEach((req) => {
            if (objectKeys.indexOf(req) < 0) {
                throw new Error(`Missing required argument field ${req} in ${req}`)
            }
        })
        return true
    }
}

export type { InvokeResult } from '@cityofzion/neon-core/lib/rpc'
export * from "@cityofzion/neo3-invoker";
export * from "@cityofzion/neo3-signer";
