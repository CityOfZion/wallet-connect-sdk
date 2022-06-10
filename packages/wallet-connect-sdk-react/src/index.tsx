import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import SignClient from "@walletconnect/sign-client";
import {SessionTypes, SignClientTypes} from "@walletconnect/types";
import WcSdk, {
    ContractInvocationMulti,
    NetworkType,
    SignedMessage,
    SignMessagePayload,
    InvokeResult,
} from "@cityofzion/wallet-connect-sdk-core";

interface IWalletConnectContext {
    signClient: SignClient | undefined
    setSignClient: Dispatch<SetStateAction<SignClient | undefined>>
    session: SessionTypes.Struct | undefined,
    setSession: Dispatch<SetStateAction<SessionTypes.Struct | undefined>>,
    isConnected: () => boolean
    getChainId: () => NetworkType | string | null
    getAccountAddress: () => string | null
    manageDisconnect: () => void
    loadSession: () => void
    manageSession: () => void
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    invokeFunction: (params: ContractInvocationMulti) => Promise<string>
    testInvoke: (params: ContractInvocationMulti) => Promise<InvokeResult>
    signMessage: (params: SignMessagePayload) => Promise<SignedMessage>
    verifyMessage: (params: SignedMessage) => Promise<boolean>
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectProvider: React.FC<{ children: any, options?: SignClientTypes.Options, autoManageSession?: boolean }> = ({ children, options, autoManageSession = false }) => {
    /**
     * The WalletConnect Library
     */
    const [signClient, setSignClient] = useState<SignClient | undefined>()

    /**
     * The current WalletConnect connected session
     */
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

    /**
     * returns if the session is connected
     */
    const isConnected = (): boolean => {
        return sdk?.isConnected() ?? false
    }

    /**
     * returns the chain id of the connected wallet
     */
    const getChainId = (): NetworkType | string | null => {
        return sdk?.getChainId() ?? null
    }

    /**
     * returns the address of the connected account of the wallet
     */
    const getAccountAddress = (): string | null => {
        return sdk?.getAccountAddress() ?? null
    }

    /**
     * disconnects from the wallet
     */
    const disconnect = useCallback(async (): Promise<void> => {
        await getSdkOrError().disconnect()
        setSession(undefined)
    }, [getSdkOrError])

    /**
     * subscribe to disconnect events and finishes the session
     */
    const manageDisconnect = useCallback((): void => {
        signClient?.events.removeAllListeners()

        signClient?.on('session_delete', async () => {
            setSession(undefined)
        })
    }, [signClient])

    const loadSession = useCallback((): void => {
        setSession(getSdkOrError().loadSession() ?? undefined)
    }, [getSdkOrError])

    /**
     * Executes `managePairing` and `manageDisconnect`
     * The perfect combination to be executed after the page load
     */
    const manageSession = useCallback(async (): Promise<void> => {
        manageDisconnect()
        loadSession()
    }, [manageDisconnect, loadSession])

    /**
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
     */
    const connect = useCallback(async (): Promise<void> => {
        setSession(await getSdkOrError().connect())
    }, [getSdkOrError])

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
    const invokeFunction = useCallback(async (params: ContractInvocationMulti): Promise<string> => {
        return await getSdkOrError().invokeFunction(params)
    }, [getSdkOrError])

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
    const testInvoke = useCallback(async (params: ContractInvocationMulti): Promise<InvokeResult> => {
        return await getSdkOrError().testInvoke(params)
    }, [getSdkOrError])

    /**
     * Sends a `signMessage` request to the Wallet.
     * Signs a message
     * @param params the params to send the request
     * @return the signed message object
     */
    const signMessage = useCallback(async (params: SignMessagePayload): Promise<SignedMessage> => {
        return await getSdkOrError().signMessage(params)
    }, [getSdkOrError])

    /**
     * Sends a `verifyMessage` request to the Wallet.
     * Checks if the signedMessage is true
     * @param params an object that represents a signed message
     * @return true if the signedMessage is acknowledged by the account
     */
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