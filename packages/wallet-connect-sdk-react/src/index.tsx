import React, {Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState} from 'react'
import WalletConnectClient, {CLIENT_EVENTS} from "@walletconnect/client";
import {ClientOptions, SessionTypes} from "@walletconnect/types";
import WcSdk, {
    ContractInvocationMulti,
    NetworkType,
    SignedMessage,
    SignMessagePayload,
    InvokeResult,
} from "@cityofzion/wallet-connect-sdk-core";

interface IWalletConnectContext {
    client: WalletConnectClient | undefined
    setClient: Dispatch<SetStateAction<WalletConnectClient | undefined>>
    session: SessionTypes.Settled | undefined,
    setSession: Dispatch<SetStateAction<SessionTypes.Settled | undefined>>,
    isConnected: () => boolean
    getChainId: () => NetworkType | string | null
    getAccountAddress: () => string | null
    managePairing: () => void
    manageDisconnect: () => void
    loadSession: () => Promise<void>
    manageSession: () => Promise<void>
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    invokeFunction: (params: ContractInvocationMulti) => Promise<string>
    testInvoke: (params: ContractInvocationMulti) => Promise<InvokeResult>
    signMessage: (params: SignMessagePayload) => Promise<SignedMessage>
    verifyMessage: (params: SignedMessage) => Promise<boolean>
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectProvider: React.FC<{ children: any, options?: ClientOptions, autoManageSession?: boolean }> = ({ children, options, autoManageSession = false }) => {
    /**
     * The WalletConnect Library
     */
    const [client, setClient] = useState<WalletConnectClient | undefined>()

    /**
     * The current WalletConnect connected session
     */
    const [session, setSession] = useState<SessionTypes.Settled | undefined>()
    const initRef = useRef(false)

    const getSdk = useCallback(() => {
        if (!client) throw Error('no client')
        return new WcSdk(client, session)
    }, [client, session])

    const getSdkOrNull = () => {
        if (!client) return null
        return new WcSdk(client, session)
    }

    /**
     * returns if the session is connected
     */
    const isConnected = (): boolean => {
        return getSdkOrNull()?.isConnected() ?? false
    }

    /**
     * returns the chain id of the connected wallet
     */
    const getChainId = (): NetworkType | string | null => {
        return getSdkOrNull()?.getChainId() ?? null
    }

    /**
     * returns the address of the connected account of the wallet
     */
    const getAccountAddress = (): string | null => {
        return getSdkOrNull()?.getAccountAddress() ?? null
    }

    /**
     * subscribe to pairing events and opens Neon website to facilitate the connection
     */
    const managePairing = useCallback((): void => {
        getSdk().managePairing()
    }, [getSdk])

    /**
     * disconnects from the wallet
     */
    const disconnect = useCallback(async (): Promise<void> => {
        await getSdk().disconnect()
        setSession(undefined)
    }, [getSdk])

    /**
     * subscribe to disconnect events and finishes the session
     */
    const manageDisconnect = useCallback((): void => {
        client?.on(
            CLIENT_EVENTS.session.deleted,
            async () => {
                await disconnect()
            }
        )
    }, [client, disconnect])

    /**
     * loads the session to be used on the application
     */
    const loadSession = useCallback(async (): Promise<void> => {
        if (client?.session.topics.length) {
            setSession(await client?.session.get(client?.session.topics[0]))
        }
    }, [client?.session])

    /**
     * Executes `managePairing`, `manageDisconnect` and `loadSession`
     * The perfect combination to be executed after the page load
     */
    const manageSession = useCallback(async (): Promise<void> => {
        managePairing()
        manageDisconnect()
        await loadSession()
    }, [managePairing, manageDisconnect, loadSession])

    /**
     * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet
     */
    const connect = async (): Promise<void> => {
        setSession(await getSdk().connect() ?? undefined)
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
    const invokeFunction = async (params: ContractInvocationMulti): Promise<string> => {
        return await getSdk().invokeFunction(params)
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
    const testInvoke = async (params: ContractInvocationMulti): Promise<InvokeResult> => {
        return await getSdk().testInvoke(params)
    }

    /**
     * Sends a `signMessage` request to the Wallet.
     * Signs a message
     * @param params the params to send the request
     * @return the signed message object
     */
    const signMessage = async (params: SignMessagePayload): Promise<SignedMessage> => {
        return await getSdk().signMessage(params)
    }

    /**
     * Sends a `verifyMessage` request to the Wallet.
     * Checks if the signedMessage is true
     * @param params an object that represents a signed message
     * @return true if the signedMessage is acknowledged by the account
     */
    const verifyMessage = async (params: SignedMessage): Promise<boolean> => {
        return await getSdk().verifyMessage(params)
    }

    useEffect(() => {
        (async () => {
            if (!setClient || !options || initRef.current) return
            initRef.current = true

            const client = await WalletConnectClient.init(options)
            setClient(() => client)
        })()
    }, [
        client,
        setClient,
        options,
        manageSession,
    ])

    useEffect(() => {
        (async () => {
            if (client && autoManageSession) {
                await manageSession()
            }
        })()
    }, [client, manageSession, autoManageSession])

    const contextValue: IWalletConnectContext = {
        client, setClient,
        session, setSession,
        isConnected,
        getChainId,
        getAccountAddress,
        managePairing,
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