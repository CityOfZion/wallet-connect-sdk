import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import SignClient from "@walletconnect/sign-client";
import {SessionTypes, SignClientTypes} from "@walletconnect/types";
import WcSdk, {
    NetworkType,
    SignedMessage,
    SignMessagePayload,
    InvokeResult,
} from "@cityofzion/wallet-connect-sdk-core";
import { ContractInvocationMulti, Neo3Invoker } from '@cityofzion/neo3-invoker'

interface IWalletConnectContext extends Neo3Invoker {
    /**
     * The WalletConnect Library
     */
    signClient: SignClient | undefined
    setSignClient: Dispatch<SetStateAction<SignClient | undefined>>

    /**
     * The current WalletConnect connected session
     */
    session: SessionTypes.Struct | undefined,
    setSession: Dispatch<SetStateAction<SessionTypes.Struct | undefined>>,

    /**
     * returns if the session is connected
     */
    isConnected: () => boolean

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
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
     * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
     */
    connect: (network: NetworkType, uriCallback?: (uri: string) => void) => Promise<void>

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
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectProvider: React.FC<{ children: any, options?: SignClientTypes.Options, autoManageSession?: boolean }> = ({ children, options, autoManageSession = false }) => {
    const [signClient, setSignClient] = useState<SignClient | undefined>()
    const [session, setSession] = useState<SessionTypes.Struct | undefined>()
    const initRef = useRef(false)

    const sdk = useMemo(() => {
        if (!signClient) return null
        return new WcSdk(signClient, session)
    }, [signClient, session])

    const getSdkOrError = useCallback(() => {
        if (!sdk) throw Error('no client')
        return sdk
    }, [sdk])

    const isConnected = (): boolean => {
        return sdk?.isConnected() ?? false
    }

    const getChainId = (): NetworkType | string | null => {
        return sdk?.getChainId() ?? null
    }

    const getAccountAddress = (): string | null => {
        return sdk?.getAccountAddress() ?? null
    }

    const disconnect = useCallback(async (): Promise<void> => {
        await getSdkOrError().disconnect()
        setSession(undefined)
    }, [getSdkOrError])

    const manageDisconnect = useCallback((): void => {
        signClient?.events.removeAllListeners()

        signClient?.on('session_delete', async () => {
            setSession(undefined)
        })
    }, [signClient])

    const loadSession = useCallback((): void => {
        setSession(getSdkOrError().loadSession() ?? undefined)
    }, [getSdkOrError])

    const manageSession = useCallback(async (): Promise<void> => {
        manageDisconnect()
        loadSession()
    }, [manageDisconnect, loadSession])

    const connect = useCallback(async (network: NetworkType, uriCallback?: (uri: string) => void): Promise<void> => {
        setSession(await getSdkOrError().connect(network, uriCallback))
    }, [getSdkOrError])

    const invokeFunction = useCallback(async (params: ContractInvocationMulti): Promise<string> => {
        return await getSdkOrError().invokeFunction(params)
    }, [getSdkOrError])

    const testInvoke = useCallback(async (params: ContractInvocationMulti): Promise<InvokeResult> => {
        return await getSdkOrError().testInvoke(params)
    }, [getSdkOrError])

    const signMessage = useCallback(async (params: SignMessagePayload): Promise<SignedMessage> => {
        return await getSdkOrError().signMessage(params)
    }, [getSdkOrError])

    const verifyMessage = useCallback(async (params: SignedMessage): Promise<boolean> => {
        return await getSdkOrError().verifyMessage(params)
    },[getSdkOrError])

    useEffect(() => {
        (async () => {
            if (!setSignClient || !options || initRef.current) return
            initRef.current = true

            const client = await SignClient.init(options)
            setSignClient(client)
        })()
    }, [
        signClient,
        setSignClient,
        options,
        manageSession,
    ])

    useEffect(() => {
        (async () => {
            if (signClient && autoManageSession) {
                await manageSession()
            }
        })()
    }, [signClient, manageSession, autoManageSession])

    const contextValue: IWalletConnectContext = {
        signClient, setSignClient,
        session, setSession,
        isConnected,
        getChainId,
        getAccountAddress,
        manageDisconnect,
        loadSession,
        manageSession,
        connect,
        disconnect,
        invokeFunction,
        testInvoke,
        signMessage,
        verifyMessage,
    }

    return (
        <WalletConnectContext.Provider value={contextValue}>
            {children}
        </WalletConnectContext.Provider>
    );
};

export const useWalletConnect = () => useContext(WalletConnectContext)

export * from "@cityofzion/wallet-connect-sdk-core";
