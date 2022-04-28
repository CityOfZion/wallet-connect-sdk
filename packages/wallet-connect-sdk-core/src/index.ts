import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client'
import { PairingTypes, SessionTypes } from '@walletconnect/types'
import { InvokeResult } from '@cityofzion/neon-core/lib/rpc'

const SUPPORTED_NETWORKS = ['neo3:private', 'neo3:testnet', 'neo3:mainnet'] as const
const SUPPORTED_METHODS = [
    'invokeFunction',
    'testInvoke',
    'signMessage',
    'verifyMessage'
] as const
const SUPPORTED_ARG_TYPES = ['Any', 'Signature', 'Boolean', 'Integer', 'Hash160', 'Address', 'ScriptHash', 'Null', 'Hash256',
    'ByteArray', 'PublicKey', 'String', 'ByteString', 'Array', 'Buffer', 'InteropInterface', 'Void'] as const
/**
 * A list of networkds supported by wallets
 */
export type NetworkType = typeof SUPPORTED_NETWORKS[number]
/**
 * A list of methods supported by wallets
 */
export type MethodType = typeof SUPPORTED_METHODS[number]
/**
 * A list of types supported by wallets
 */
export type ArgType = typeof SUPPORTED_ARG_TYPES[number]

/**
 * An argument for a contract invocation.
 */
export interface Argument {
    type: ArgType,
    value: string | number | boolean | Argument[]
}

export class WcSdkError extends Error {
    payload: unknown
    constructor (payload: unknown) {
        super()
        this.payload = payload
    }
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
 * Usually the default signer is enough: `{ scopes: WitnessScope.CalledByEntry }`
 * But you may need additional authorization, for instance, allow the SmartContract to invoke another specific contract:
 *
 * ```
 * {
 *   scopes: WitnessScope.CustomContracts,
 *   allowedContracts: ['0xf970f4ccecd765b63732b821775dc38c25d74f23']
 * }
 * ```
 *
 */
export type Signer = {
    /**
     * The level of permission the invocation needs
     */
    scopes: WitnessScope
    /**
     * When the scopes is `WitnessScope.CustomContracts`, you need to specify which contracts are allowed
     */
    allowedContracts?: string[]
    /**
     * When the scopes is `WitnessScope.CustomGroups`, you need to specify which groups are allowed
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
     * When requesting multiple invocations, you can set `abortOnFail` to true on some invocations so the VM will abort the rest of the calls if this invocation returns `false`
     */
    abortOnFail?: boolean
    /**
     * the signing options
     */
}

/**
 * A simple interface that defines the MultiInvoke options
 */
export type ContractInvocationMulti = {
    /**
     * the signing options
     */
    signers: Signer[]
    /**
     * The array of invocations
     */
    invocations: ContractInvocation[]
}

/**
 * A simple interface that defines the SignMessage payload, where version 1 is obsolete and version 2 is compatible with NeoFS
 */
export type SignMessagePayload = {
    message: string,
    version: number
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
 * An adapter of WalletConnectClient to work easily with Neon Wallet
 */
export default class WcSdk {
    /**
     * The WalletConnect Library
     */
    client: WalletConnectClient

    /**
     * The current WalletConnect connected session
     */
    session: SessionTypes.Settled | null = null

    /**
     * To initialize the adapter you need to provide the WalletConnectClient
     * @param client Client of the original WalletConnect library
     */
    constructor (client: WalletConnectClient) {
        this.client = client
    }

    /**
     * returns if the session is connected
     */
    get isConnected (): boolean {
        return !!this.session
    }

    /**
     * returns the chain id of the connected wallet
     */
    get chainId (): NetworkType | string | null {
        const info = this.accountInfo
        return info && `${info[0]}:${info[1]}`
    }

    /**
     * returns the address of the connected account of the wallet
     */
    get accountAddress (): string | null {
        const info = this.accountInfo
        return info && info[2]
    }

    private get accountInfo (): string[] | null {
        if (!this.session?.state.accounts.length) {
            return null
        }
        return this.session?.state.accounts[0].split(':') ?? null
    }

    /**
     * subscribe to pairing events and opens Neon website to facilitate the connection
     */
    managePairing (): void {
        this.client.on(
            CLIENT_EVENTS.pairing.proposal,
            async (proposal: PairingTypes.Proposal) => {
                const { uri } = proposal.signal.params
                window.open(`https://neon.coz.io/connect?uri=${uri}`, '_blank')?.focus()
            }
        )
    }

    /**
     * subscribe to disconnect events and finishes the session
     */
    manageDisconnect (): void {
        this.client.on(
            CLIENT_EVENTS.session.deleted,
            () => {
                this.disconnect()
            }
        )
    }

    /**
     * loads the session to be used on the application
     */
    async loadSession (): Promise<SessionTypes.Settled | null> {
        if (this.client.session.topics.length) {
            this.session = await this.client.session.get(this.client.session.topics[0])
        }

        return this.session
    }

    /**
     * Executes `managePairing`, `manageDisconnect` and `loadSession`
     * The perfect combination to be executed after the page load
     */
    async manageSession (): Promise<void> {
        this.managePairing()
        this.manageDisconnect()
        await this.loadSession()
    }

    /**
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
     */
    async connect (): Promise<SessionTypes.Settled | null> {
        this.session = (await this.client.connect({
            permissions: {
                blockchain: {
                    chains: [...SUPPORTED_NETWORKS]
                },
                jsonrpc: {
                    methods: [...SUPPORTED_METHODS]
                }
            }
        })) ?? null

        return this.session
    }

    /**
     * disconnects from the wallet
     */
    async disconnect (): Promise<void> {
        if (!this.session) return

        await this.client.disconnect({
            topic: this.session.topic,
            reason: { code: 5900, message: 'USER_DISCONNECTED' }
        })
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
     *     scopes: WitnessScope.Global
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

        const resp: unknown = await this.client.request({
            topic: this.session?.topic ?? '',
            chainId: this.chainId ?? '',
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
     *     scopes: WitnessScope.None
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

        const resp = await this.client.request({
            topic: this.session?.topic ?? '',
            chainId: this.chainId ?? '',
            request
        })

        if (!resp || (resp && resp.state !== 'HALT')) {
            throw new WcSdkError(resp)
        }

        return resp as InvokeResult
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

        const resp = await this.client.request({
            topic: this.session?.topic ?? '',
            chainId: this.chainId ?? '',
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

        const resp = await this.client.request({
            topic: this.session?.topic ?? '',
            chainId: this.chainId ?? '',
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
            if (!(signer.scopes in WitnessScope)) {
                throw new Error(`Invalid signature scopes: ${signer.scopes}`)
            }

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

            invocation.args.forEach((arg: Argument) => {
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

    private objectValidation (object: Argument | ContractInvocation | ContractInvocationMulti, keys: string[]): boolean {
        const objectKeys = Object.keys(object)

        keys.forEach((req) => {
            if (objectKeys.indexOf(req) < 0) {
                throw new Error(`Missing required argument field ${req} in ${req}`)
            }
        })
        return true
    }
}
