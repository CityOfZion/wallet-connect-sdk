import React, {useContext, useEffect, useState} from "react";
import Client from "@walletconnect/client";
import {AppMetadata, SessionTypes} from "@walletconnect/types";
import {RpcCallResult, WcSdk} from "@cityofzion/wallet-connect-sdk-core/lib";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {RequestArguments} from "@json-rpc-tools/types";

interface IWalletConnectContext {
    wcClient: Client | undefined,
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>,
    session: SessionTypes.Created | undefined,
    loadingSession: boolean,
    setSession: React.Dispatch<React.SetStateAction<SessionTypes.Created | undefined>>,
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
    connect: (pairing?: { topic: string }) => Promise<void>,
    sendRequest: (request: RequestArguments) => Promise<RpcCallResult>,
    invokeFunction: (scripthash: string, method: string, params: any[]) => Promise<RpcCallResult>,
    disconnect: () => Promise<void>,
}

export interface CtxOptions {
    appMetadata: AppMetadata,
    chainId: string,
    logger: string,
    methods: string[],
    relayServer: string
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

    const resetApp = async () => {
        setWcClient(undefined)
        setSession(undefined)
        setLoadingSession(true)
        setPairings([])
        setIsPairing(false)
        setIsPendingApproval(false)
        setUri("")
        setAccounts([])
        await initWcClient()
    }

    useEffect(() => {
        initWcClient()
    }, [])

    useEffect(() => {
        if (wcClient) {
            subscribeToEvents()
            checkPersistedState()
        }
    }, [wcClient])

    const initWcClient = async () => {
        setWcClient(await WcSdk.initClient(options.logger, options.relayServer))
    }

    const subscribeToEvents = () => {
        WcSdk.subscribeToEvents(wcClient, {
            onProposal: uri => {
                setUri(uri)
                QRCodeModal.open(uri, () => {})
            },
            onCreated: topics => setPairings(topics),
            onDeleted: async () => await resetApp()
        })
    }

    const checkPersistedState = async () => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized")
        }

        setPairings(wcClient.pairing.topics)

        if (session) return

        const s = await WcSdk.getSession(wcClient)
        if (s) {
            onSessionConnected(session)
        }
        setLoadingSession(false)
    }

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

    const handleRequest = async (caller: () => Promise<RpcCallResult>) => {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (!session) {
            throw new Error("Session is not connected");
        }

        setIsPendingApproval(true)
        const resp = await caller()
        setIsPendingApproval(false)
        return resp
    }

    const sendRequest = async (request: RequestArguments) => {
        return await handleRequest(async () => await WcSdk.sendRequest(wcClient, session, options.chainId, request))
    };

    const invokeFunction = async (scripthash: string, method: string, params: any[]) => {
        return await handleRequest(async () => await WcSdk.invokeFunction(wcClient, session, options.chainId, scripthash, method, params))
    };

    const contextValue = {
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
        disconnect,
    }

    return (
        <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
    );
}

export const useWalletConnect = () => useContext(WalletConnectContext)