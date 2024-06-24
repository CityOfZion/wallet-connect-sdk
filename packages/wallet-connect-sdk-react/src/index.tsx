import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import WcSdk, {
  SignedMessage,
  SignMessagePayload,
  InvokeResult,
  WalletInfo,
  NetworkVersion,
  NetworkType,
  Method,
  CoreEvents,
} from '@cityofzion/wallet-connect-sdk-core'
import {
  ContractInvocationMulti,
  EncryptedPayload,
  Neo3Invoker,
  Neo3Signer,
  RpcResponseStackItem,
} from '@cityofzion/neon-dappkit-types'
import TypedEventEmitter from 'typed-emitter'
import EventEmitter from 'events'

interface IWalletConnectContext extends Neo3Invoker, Neo3Signer {
  /**
   * The WalletConnect Library
   */
  sdk: WcSdk | undefined

  /**
   * The current WalletConnect connected session
   */
  session: SessionTypes.Struct | undefined
  setSession: Dispatch<SetStateAction<SessionTypes.Struct | undefined>>

  /**
   * The current WalletConnect event emitter
   */
  emitter: TypedEventEmitter<CoreEvents>

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
   * Start the process of establishing a new connection, with the default supported chains and methods, to be used when there is no session yet.
   * The difference between this method and `createConnection` is that this method will automatically open Neon connection website and save the session state
   * @param network Choose between 'neo3:mainnet', 'neo3:testnnet' or 'neo3:private'
   * @param methods An array of methods used on your application, choose between the methods of the documentation
   */
  connect: (network: NetworkType, methods: Method[]) => Promise<SessionTypes.Struct>

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

  wipeRequests: () => Promise<string[]>

  withContext: (contextualMessage: string) => WcSdk
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectProvider: React.FC<{
  children: any
  options?: SignClientTypes.Options
  autoManageSession?: boolean
}> = ({ children, options, autoManageSession = false }) => {
  const sdkRef = useRef<WcSdk>()
  const [session, setSession] = useState<SessionTypes.Struct | undefined>()
  const emitter = useRef(new EventEmitter() as TypedEventEmitter<CoreEvents>)

  const getSdkOrError = useCallback(() => {
    if (!sdkRef.current) throw Error('no client')
    return sdkRef.current
  }, [])

  const isConnected = (): boolean => {
    try {
      return getSdkOrError().isConnected()
    } catch {
      return false
    }
  }

  const getChainId = (): NetworkType | string | null => {
    return getSdkOrError().getChainId()
  }

  const getAccountAddress = (): string | null => {
    return getSdkOrError().getAccountAddress() ?? null
  }

  const disconnect = useCallback(async (): Promise<void> => {
    return getSdkOrError().disconnect()
  }, [getSdkOrError])

  const manageDisconnect = useCallback((): void => {
    return getSdkOrError().manageDisconnect()
  }, [getSdkOrError])

  const loadSession = useCallback((): SessionTypes.Struct | null => {
    return getSdkOrError().loadSession()
  }, [getSdkOrError])

  const manageSession = useCallback((): Promise<SessionTypes.Struct | null> => {
    return getSdkOrError().manageSession()
  }, [getSdkOrError])

  const connect = useCallback(
    async (network: NetworkType, methods: Method[]): Promise<SessionTypes.Struct> => {
      return getSdkOrError().connect(network, methods)
    },
    [getSdkOrError],
  )

  const createConnection = useCallback(
    async (
      network: NetworkType,
      methods: Method[],
    ): Promise<{
      uri?: string
      approval: () => Promise<SessionTypes.Struct>
    }> => {
      return await getSdkOrError().createConnection(network, methods)
    },
    [getSdkOrError],
  )

  const invokeFunction = useCallback(
    (params: ContractInvocationMulti): Promise<string> => {
      return getSdkOrError().invokeFunction(params)
    },
    [getSdkOrError],
  )

  const testInvoke = useCallback(
    (params: ContractInvocationMulti): Promise<InvokeResult> => {
      return getSdkOrError().testInvoke(params)
    },
    [getSdkOrError],
  )

  const signMessage = useCallback(
    (params: SignMessagePayload): Promise<SignedMessage> => {
      return getSdkOrError().signMessage(params)
    },
    [getSdkOrError],
  )

  const verifyMessage = useCallback(
    (params: SignedMessage): Promise<boolean> => {
      return getSdkOrError().verifyMessage(params)
    },
    [getSdkOrError],
  )

  const traverseIterator = useCallback(
    (sessionId: string, iteratorId: string, count: number): Promise<RpcResponseStackItem[]> => {
      return getSdkOrError().traverseIterator(sessionId, iteratorId, count)
    },
    [getSdkOrError],
  )

  const getWalletInfo = useCallback((): Promise<WalletInfo> => {
    return getSdkOrError().getWalletInfo()
  }, [getSdkOrError])

  const getNetworkVersion = useCallback((): Promise<NetworkVersion> => {
    return getSdkOrError().getNetworkVersion()
  }, [getSdkOrError])

  const decrypt = useCallback(
    (payload: EncryptedPayload): Promise<string> => {
      return getSdkOrError().decrypt(payload)
    },
    [getSdkOrError],
  )

  const encrypt = useCallback(
    (message: string, publicKeys: string[]) => {
      return getSdkOrError().encrypt(message, publicKeys)
    },
    [getSdkOrError],
  )

  const decryptFromArray = useCallback(
    (payloads: EncryptedPayload[]) => {
      return getSdkOrError().decryptFromArray(payloads)
    },
    [getSdkOrError],
  )

  const calculateFee = useCallback(
    (params: ContractInvocationMulti) => {
      return getSdkOrError().calculateFee(params)
    },
    [getSdkOrError],
  )

  const signTransaction = useCallback(
    (params: ContractInvocationMulti) => {
      return getSdkOrError().signTransaction(params)
    },
    [getSdkOrError],
  )

  const wipeRequests = useCallback(() => {
    return getSdkOrError().wipeRequests()
  }, [getSdkOrError])

  const withContext = useCallback(
    (contextualMessage: string) => {
      return getSdkOrError().withContext(contextualMessage)
    },
    [getSdkOrError],
  )

  const setupWcClient = useCallback(async () => {
    if (!options) return
    const wcSdk = await WcSdk.init(options)
    wcSdk.emitter.removeAllListeners()
    wcSdk.emitter.on('session', (session) => {
      emitter.current.emit('session', session)
      setSession(session ?? undefined)
    })

    sdkRef.current = wcSdk

    if (autoManageSession) {
      manageSession()
    }
  }, [options, manageSession, autoManageSession])

  useEffect(() => {
    setupWcClient()
  }, [setupWcClient])

  const contextValue: IWalletConnectContext = {
    sdk: sdkRef.current,
    emitter: emitter.current,
    session,
    setSession,
    isConnected,
    getChainId,
    getAccountAddress,
    manageDisconnect,
    loadSession,
    manageSession,
    connect,
    createConnection,
    disconnect,
    invokeFunction,
    traverseIterator,
    getWalletInfo,
    getNetworkVersion,
    testInvoke,
    signMessage,
    verifyMessage,
    encrypt,
    decrypt,
    decryptFromArray,
    signTransaction,
    calculateFee,
    wipeRequests,
    withContext,
  }

  return <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
}

export const useWalletConnect = () => useContext(WalletConnectContext)

export * from '@cityofzion/wallet-connect-sdk-core'
