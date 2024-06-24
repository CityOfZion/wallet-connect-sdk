import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { IWalletConnectWalletContext, TSetAdaptersParam, TWalletConnectWalletProps } from './types'
import {
  WcWalletSDK,
  EStatus,
  TApproveSessionOptions,
  TRejectReason,
  TRequestResult,
  TSession,
  TSessionProposal,
  TSessionRequest,
  TWalletCoreEvents,
} from '@cityofzion/wallet-connect-sdk-wallet-core'
import TypedEventEmitter from 'typed-emitter'
import EventEmitter from 'events'

export const WalletConnectWalletContext = React.createContext({} as IWalletConnectWalletContext)

/**
 * The context to deal with WcSDKWallet
 * @param children React children
 * @param options.clientOptions SignClient Startup options of the original WalletConnect library
 * @param options.adapter [adapter] The initial adapter
 * @param options.methods [methods] An array of valid methods used on your application
 * @param options.autoAcceptMethods [autoAcceptMethods=DEFAULT_AUTO_ACCEPT_METHODS] An array of valid auto accepted methods used on your application
 */
export const WalletConnectWalletProvider = ({ children, options }: TWalletConnectWalletProps) => {
  const sdk = useRef<WcWalletSDK>(new WcWalletSDK(options))
  const emitter = useRef(new EventEmitter() as TypedEventEmitter<TWalletCoreEvents>)

  const [sessions, setSessions] = useState<TSession[]>([])
  const [proposals, setProposals] = useState<TSessionProposal[]>([])
  const [requests, setRequests] = useState<TSessionRequest[]>([])
  const [status, setStatus] = useState<EStatus>(EStatus.NOT_STARTED)

  const connect = useCallback(async (uri: string): Promise<void> => {
    return await sdk.current.connect(uri)
  }, [])

  const disconnect = useCallback(async (session: TSession, reason?: TRejectReason): Promise<void> => {
    return await sdk.current.disconnect(session, reason)
  }, [])

  const approveProposal = useCallback(
    async (proposal: TSessionProposal, options: TApproveSessionOptions): Promise<TSession> => {
      return await sdk.current.approveProposal(proposal, options)
    },
    [],
  )

  const rejectProposal = useCallback(async (proposal: TSessionProposal, reason?: TRejectReason): Promise<void> => {
    return await sdk.current.rejectProposal(proposal, reason)
  }, [])

  const approveRequest = useCallback(async (request: TSessionRequest): Promise<TRequestResult> => {
    return await sdk.current.approveRequest(request)
  }, [])

  const rejectRequest = useCallback(async (request: TSessionRequest, reason?: TRejectReason): Promise<void> => {
    return await sdk.current.rejectRequest(request, reason)
  }, [])

  const setAdapters = useCallback((adapters: TSetAdaptersParam) => {
    Object.keys(adapters).forEach((blockchain) => {
      const adapter = adapters[blockchain]
      if (!adapter) throw new Error("You can't set an empty adapter")

      sdk.current.blockchainsOptions[blockchain].adapter = adapters[blockchain]
    })
  }, [])

  useEffect(() => {
    sdk.current.emitter.on('proposals', (items: TSessionProposal[]) => {
      emitter.current.emit('proposals', items)
      setProposals(items)
    })

    sdk.current.emitter.on('sessions', (items: TSession[]) => {
      emitter.current.emit('sessions', items)
      setSessions(items)
    })

    sdk.current.emitter.on('requests', (items: TSessionRequest[]) => {
      emitter.current.emit('requests', items)
      setRequests(items)
    })

    sdk.current.emitter.on('status', (item: EStatus) => {
      emitter.current.emit('status', item)
      setStatus(item)
    })

    sdk.current.init()

    return () => {
      sdk.current?.emitter.removeAllListeners()
    }
  }, [])

  return (
    <WalletConnectWalletContext.Provider
      value={{
        sdk: sdk.current,
        emitter: emitter.current,
        sessions,
        proposals,
        requests,
        status,
        connect,
        disconnect,
        approveProposal,
        rejectProposal,
        approveRequest,
        rejectRequest,
        setAdapters,
      }}
    >
      {children}
    </WalletConnectWalletContext.Provider>
  )
}

export const useWalletConnectWallet = () => useContext(WalletConnectWalletContext)
