import React, {useCallback, useContext, useEffect, useState} from "react";
import Client from "@walletconnect/client";
import {AppMetadata, SessionTypes} from "@walletconnect/types";
import {ContractInvocation, RpcCallResult, WcSdk} from "@cityofzion/wallet-connect-sdk-core";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {RequestArguments} from "@walletconnect/jsonrpc-utils";

interface IWalletConnectContext {
    wcClient: Client | undefined,
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>,
    session: SessionTypes.Created | undefined,
    setSession: React.Dispatch<React.SetStateAction<SessionTypes.Created | undefined>>,
    loadingSession: boolean,
    setLoadingSession: React.Dispatch<React.SetStateAction<boolean>>,
    pairings: string[],
    setPairings: React.Dispatch<React.SetStateAction<string[]>>,
    isPairing: boolean,
    setIsPairing: React.Dispatch<React.SetStateAction<boolean>>,
    isPendingApproval: boolean,
    setIsPendingApproval: React.Dispatch<React.SetStateAction<boolean>>,
    uri: string,
    setUri: React.Dispatch<React.SetStateAction<string>>,
    accounts: string[],
    setAccounts: React.Dispatch<React.SetStateAction<string[]>>,

    openPairing: () => Promise<void>,
    connect: (topic?: string) => Promise<void>,
    sendRequest: (request: RequestArguments) => Promise<RpcCallResult>,
    invokeFunction: (request: ContractInvocation) => Promise<RpcCallResult>,
    testInvoke: (request: ContractInvocation) => Promise<RpcCallResult>,
    multiInvoke: (request: ContractInvocation[]) => Promise<RpcCallResult>,
    multiTestInvoke: (request: ContractInvocation[]) => Promise<RpcCallResult>,
    disconnect: () => Promise<void>,
    getAccountAddress: (accountIndex?: number) => string | null
    getChainId: (accountIndex?: number) => string | null
}

export interface CtxOptions {
    appMetadata: AppMetadata,
    chainId?: string,
    chains?: string[],
    logger: string,
    methods: string[],
    relayServer: string,
    qrCodeModal: boolean
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectContextProvider: React.FC<{ options: CtxOptions, children: any }> = ({ options, children }) => {
    const [wcClient, setWcClient] = useState<Client | undefined>(undefined)
    const [session, setSession] = useState<SessionTypes.Created | undefined>(undefined)
    const [loadingSession, setLoadingSession] = useState(true)
    const [pairings, setPairings] = useState<string[]>([])
    const [isPairing, setIsPairing] = useState(false)
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
        setPairings([])
        setIsPairing(false)
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
            onProposal: uri => {
                setUri(uri)
                if (options.qrCodeModal) {
                    QRCodeModal.open(uri, () => {})
                }
            },
            onCreated: topics => setPairings(topics),
            onDeleted: async () => await resetApp()
        })
    }, [resetApp, wcClient])

    const checkPersistedState = useCallback(async () => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }

        setPairings(wcClient.pairing.topics)

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

        setIsPairing(false)

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

    const openPairing = async () => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }
        if (wcClient.pairing.topics.length) {
            setIsPairing(true)
            return
        }
        await connect()
    }

    const handleRequest = async (caller: (wcClient: Client, session: SessionTypes.Created) => Promise<RpcCallResult>) => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (!session) {
            throw new Error("Session is not connected");
        }

        setIsPendingApproval(true)
        const resp = await caller(wcClient, session)
        setIsPendingApproval(false)
        return resp
    }

    const sendRequest = async (request: RequestArguments) => {
        return await handleRequest(async (c, s) => await WcSdk.sendRequest(c, s, getChainIdOrOptionChainId(), request))
    };

    const invokeFunction = async (request: ContractInvocation) => {
        return await handleRequest(async (c, s) => await WcSdk.invokeFunction(c, s, getChainIdOrOptionChainId(), request))
    };

    const testInvoke = async (request: ContractInvocation) => {
        return await handleRequest(async (c, s) => await WcSdk.testInvoke(c, s, getChainIdOrOptionChainId(), request))
    };

    const multiInvoke = async (request: ContractInvocation[]) => {
        return await handleRequest(async (c, s) => await WcSdk.multiInvoke(c, s, getChainIdOrOptionChainId(), request))
    };

    const multiTestInvoke = async (request: ContractInvocation[]) => {
        return await handleRequest(async (c, s) => await WcSdk.multiTestInvoke(c, s, getChainIdOrOptionChainId(), request))
    };

    const contextValue: IWalletConnectContext = {
        wcClient,
        setWcClient,
        session,
        setSession,
        loadingSession,
        setLoadingSession,
        pairings,
        setPairings,
        isPairing,
        setIsPairing,
        isPendingApproval,
        setIsPendingApproval,
        uri,
        setUri,
        accounts,
        setAccounts,

        openPairing,
        connect,
        sendRequest,
        invokeFunction,
        testInvoke,
        multiInvoke,
        multiTestInvoke,
        disconnect,
        getAccountAddress,
        getChainId,
    }

    return (
        <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
    );
}

export const useWalletConnect = () => useContext(WalletConnectContext)
