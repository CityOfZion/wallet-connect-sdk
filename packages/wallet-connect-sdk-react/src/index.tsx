import React, {useCallback, useContext, useEffect, useState} from "react";
import Client from "@walletconnect/client";
import {AppMetadata, SessionTypes} from "@walletconnect/types";
import {
    ContractInvocationMulti,
    RpcCallResult,
    WcSdk,
    SignedMessage,
    WCMethodType,
    MethodAndParams
} from "@cityofzion/wallet-connect-sdk-core";
import QRCodeModal from "@walletconnect/qrcode-modal";

/**
 * WalletConnect's context for React
 */
interface IWalletConnectContext {
    /**
     * Wallet Connect Client, used on most of the methods
     */
    wcClient: Client | undefined,
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>,

    /**
     * The Session of the current connection
     */
    session: SessionTypes.Created | undefined,
    setSession: React.Dispatch<React.SetStateAction<SessionTypes.Created | undefined>>,

    /**
     * An indicator if the session is loading
     */
    loadingSession: boolean,
    setLoadingSession: React.Dispatch<React.SetStateAction<boolean>>,

    /**
     * An indicator for when there is any request that is pending for the wallet to approve, use this variable to ask the users to check their wallet to approve the request
     */
    isPendingApproval: boolean,
    setIsPendingApproval: React.Dispatch<React.SetStateAction<boolean>>,

    /**
     * The Connection Proposal URI, use this variable to show a custom QRCode
     *
     * Note: The QRCodeModal is automatically shown by default, to disable this feature set `qrCodeModal` option as false
     *
     * ```
     * useEffect(() => {
     *     if (walletConnectCtx.uri.length) {
     *         window.open(`https://neon.coz.io/connect?uri=${walletConnectCtx.uri}`, '_blank')?.focus();
     *     }
     * }, [walletConnectCtx.uri])
     * ```
     */
    uri: string,
    setUri: React.Dispatch<React.SetStateAction<string>>,

    /**
     * Connected Accounts, the string is composed by the format: `${chainName}:${chainEnvironment}:${accountAddress}`
     *
     * Use `walletConnectCtx.getAccountAddress()` to retrieve only the accountAddress
     */
    accounts: string[],
    setAccounts: React.Dispatch<React.SetStateAction<string[]>>,

    /**
     * Initialize the connection process
     * @param topic optional pairing topic to reestablish an existing connection
     */
    connect: (topic?: string) => Promise<void>,

    /**
     * Sends a request to the Wallet and it will call the RpcServer
     * ```
     * const result = await walletConnectCtx.sendRequest({
     *   method: 'getapplicationlog',
     *   params: ['0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c']
     * })
     * ```
     * @param request the request information object containing the rpc method name and the parameters
     * @return the call result promise
     */
    sendRequest: (request: MethodAndParams) => Promise<RpcCallResult<any>>,

    /**
     * Sends an 'invokeFunction' request to the Wallet and it will communicate with the blockchain. It will consume gas and persist data to the blockchain.
     * ```
     * const resp = await walletConnectCtx.invokeFunction({
     *    signers: [{ scopes: WitnessScope.None }],
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
     * @param request The invocation request payload
     * @return the call result promise
     */
    invokeFunction: (request: ContractInvocationMulti) => Promise<RpcCallResult<any>>,

    /**
     * Sends a `testInvoke` request to the Wallet and it will communicate with the blockchain.
     * It will not consume any gas but it will also not persist any data, this is often used to retrieve SmartContract information or check how much gas an invocation will cost.
     * Also, the wallet might choose to not ask the user authorization for test invocations making them easy to use.
     * ```
     * const resp = await walletConnectCtx.testInvoke({
     *     scriptHash: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
     *     operation: 'getStream',
     *     args: [{ type: 'Integer', value: 17 }],
     *     signer: { scopes: WitnessScope.None }
     * })
     * ```
     * @param request the contract invocation options
     * @return the call result promise
     */
    testInvoke: (request: ContractInvocationMulti) => Promise<RpcCallResult<any>>,

    /**
     * Sends a `signMessage` request to the Wallet.
     * Signs a message
     * @param message the message to be signed
     * @return the signed message object
     */
    signMessage: (message: string) => Promise<RpcCallResult<SignedMessage>>,

    /**
     * Sends a `verifyMessage` request to the Wallet.
     * Checks if the signedMessage is true
     * @param signedMessage an object that represents a signed message
     * @return true if the signedMessage is acknowledged by the account
     */
    verifyMessage: (signedMessage: SignedMessage) => Promise<RpcCallResult<boolean>>,

    /**
     * Disconnects from the Wallet, use this method to logout
     */
    disconnect: () => Promise<void>,

    /**
     * gets the address of the connected account
     * @param accountIndex the index of the account to retrieve, gets the first account if no index is provided
     * @return the address of the connected account of the wallet
     */
    getAccountAddress: (accountIndex?: number) => string | null

    /**
     * gets the chain id of the first connected account.
     * @return a string that represents the blockchain
     */
    getChainId: (accountIndex?: number) => string | null
}

/**
 * A simple interface used to define the options for wallet connect interaction
 */
export interface CtxOptions {
    /**
     * the dApp's metadata to be shown on the wallet
     * ```
     * {
     *     name: "My dApp Name",
     *     description: "This is the dApp description",
     *     url: "https://mydappwebsite.com/",
     *     icons: ["https://mydappwebsite.com/icon.png"]
     * }
     * ```
     */
    appMetadata: AppMetadata,

    /**
     * @deprecated Use `chains` instead
     */
    chainId?: string,

    /**
     * Defines which chains the dApp accepts to connect to
     * ```
     * ['neo3:mainnet', 'neo3:testnet', 'neo3:private']
     * ```
     * The wallet will decide which chain it will use and the dApp can check the choice by calling one of the methods below:
     * ```
     * // calling the static method passing a session as parameter
     * const chain = WcSdk.getChainId(session)
     * // calling the getter of an instance of WcSdk
     * const chain = wcInstance.chainId
     * ```
     */
    chains?: string[],

    /**
     * the logger level, describes how much information to show on the log, use `debug` for more information or `error` for less information
     */
    logger: string,

    /**
     * Which methods the dApp needs authorization to call
     * ```
     * [
     *     'invokeFunction', // makes real invocations that persist data on the blockchain
     *     'testInvoke', // makes test invocations that don't require user authorization, often used to retrieve information provided by the SmartContract
     *     // You can also provide any other method name present on the RpcServer, eg.:
     *     'getversion'
     * ]
     * ```
     */
    methods: WCMethodType[],

    /**
     * the relayserver to connect to. It needs to be the same relay server of the wallet. It's recommended to use `wss://relay.walletconnect.org`
     */
    relayServer: string,

    /**
     * set it to true to automatically show the QRCode modal for the connection
     */
    qrCodeModal: boolean
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectContextProvider: React.FC<{ options: CtxOptions, children: any }> = ({ options, children }) => {
    const [wcClient, setWcClient] = useState<Client | undefined>(undefined)
    const [session, setSession] = useState<SessionTypes.Created | undefined>(undefined)
    const [loadingSession, setLoadingSession] = useState(true)
    const [isPendingApproval, setIsPendingApproval] = useState(false)
    const [uri, setUri] = useState("")
    const [accounts, setAccounts] = useState<string[]>([])

    const initWcClient = useCallback(async () => {
        setWcClient(await WcSdk.initClient(options.logger, options.relayServer))
    }, [options.logger, options.relayServer])

    const resetApp = useCallback(async () => {
        setWcClient(undefined)
        setSession(undefined)
        setLoadingSession(true)
        setIsPendingApproval(false)
        setUri("")
        setAccounts([])
        await initWcClient()
    }, [initWcClient])

    useEffect(() => {
        initWcClient()
    }, [initWcClient])

    const subscribeToEvents = useCallback(() => {
        WcSdk.subscribeToEvents(wcClient, {
            onProposal: (uri: string) => {
                setUri(uri)
                if (options.qrCodeModal) {
                    QRCodeModal.open(uri, () => {})
                }
            },
            onDeleted: async () => await resetApp()
        })
    }, [resetApp, wcClient])

    const checkPersistedState = useCallback(async () => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }

        if (session) return

        const s = await WcSdk.getSession(wcClient)
        if (s) {
            onSessionConnected(s)
        }
        setLoadingSession(false)
    }, [session, wcClient])

    useEffect(() => {
        if (wcClient) {
            subscribeToEvents()
            checkPersistedState()
        }
    }, [wcClient, subscribeToEvents, checkPersistedState])

    const onSessionConnected = (session: SessionTypes.Settled) => {
        setSession(session)
        setAccounts(session.state.accounts)
    }

    const connect = async (topic?: string) => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }

        try {
            const session = await WcSdk.connect(wcClient, {topic, ...options})
            onSessionConnected(session)
        } catch (e) {
            // ignore rejection
        }

        // close modal in case it was open
        setUri("")
        QRCodeModal.close()
    }

    const disconnect = async () => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }
        if (!session) {
            throw new Error("Session is not connected")
        }

        await WcSdk.disconnect(wcClient, session)
        await resetApp()
    }

    const getAccountAddress = (accountIndex?: number) => {
        return session ? WcSdk.getAccountAddress(session, accountIndex) : null
    }

    const getChainId = (accountIndex?: number) => {
        return session ? WcSdk.getChainId(session, accountIndex) : null
    }

    const getChainIdOrOptionChainId = (accountIndex?: number) => {
        return session ? WcSdk.getChainId(session, accountIndex) : (options.chainId || options.chains?.[0] || '')
    }

    async function handleRequest<T>(caller: (wcClient: Client, session: SessionTypes.Created, chainId: string) => Promise<RpcCallResult<T>>) {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (!session) {
            throw new Error("Session is not connected");
        }
        const chainId = getChainIdOrOptionChainId()
        if (!chainId) {
            throw new Error("Chain ID not found");
        }


        setIsPendingApproval(true)
        const resp = await caller(wcClient, session, chainId)
        setIsPendingApproval(false)
        return resp
    }

    const sendRequest = async (request: MethodAndParams) => {
        return await handleRequest(async (w, s, c) => await WcSdk.sendRequest(w, s, c, request))
    };

    const invokeFunction = async (request: ContractInvocationMulti) => {
        return await handleRequest(async (w, s, c) => await WcSdk.invokeFunction(w, s, c, request))
    };

    const testInvoke = async (request: ContractInvocationMulti) => {
        return await handleRequest(async (w, s, c) => await WcSdk.testInvoke(w, s, c, request))
    };

    const signMessage = async (message: string) => {
        return await handleRequest(async (w, s, c) => await WcSdk.signMessage(w, s, c, message))
    };

    const verifyMessage = async (signedMessage: SignedMessage) => {
        return await handleRequest(async (w, s, c) => await WcSdk.verifyMessage(w, s, c, signedMessage))
    };

    const contextValue: IWalletConnectContext = {
        wcClient,
        setWcClient,
        session,
        setSession,
        loadingSession,
        setLoadingSession,
        isPendingApproval,
        setIsPendingApproval,
        uri,
        setUri,
        accounts,
        setAccounts,
        connect,
        sendRequest,
        invokeFunction,
        testInvoke,
        signMessage,
        verifyMessage,
        disconnect,
        getAccountAddress,
        getChainId,
    }

    return (
        <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
    );
}

export const useWalletConnect = () => useContext(WalletConnectContext)
