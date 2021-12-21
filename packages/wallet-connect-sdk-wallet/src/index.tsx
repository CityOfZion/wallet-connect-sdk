import React, {useCallback, useContext, useEffect, useState} from 'react'
import Client, {CLIENT_EVENTS} from '@walletconnect/client'
import {AppMetadata, SessionTypes} from '@walletconnect/types'
import {ERROR} from '@walletconnect/utils'
import KeyValueStorage from 'keyvaluestorage'
import PropTypes from 'prop-types'
import {KeyValueStorageOptions} from 'keyvaluestorage/dist/cjs/shared'
import {
  formatJsonRpcError,
  JsonRpcRequest,
  JsonRpcResponse,
} from '@json-rpc-tools/utils'

type OnRequestCallback = (
  accountAddress: string,
  chainId: string,
  request: JsonRpcRequest
) => Promise<JsonRpcResponse>
type AutoAcceptCallback = (
  accountAddress: string | undefined,
  chainId: string | undefined,
  request: JsonRpcRequest
) => boolean

interface IWalletConnectContext {
  wcClient: Client | undefined
  setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>
  storage: KeyValueStorage | undefined
  setStorage: React.Dispatch<React.SetStateAction<KeyValueStorage | undefined>>
  sessionProposals: SessionTypes.Proposal[]
  setSessionProposals: React.Dispatch<
    React.SetStateAction<SessionTypes.Proposal[]>
    >
  initialized: boolean
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>
  chains: string[]
  setChains: React.Dispatch<React.SetStateAction<string[]>>
  sessions: SessionTypes.Created[]
  setSessions: React.Dispatch<React.SetStateAction<SessionTypes.Created[]>>
  requests: SessionTypes.RequestEvent[]
  setRequests: React.Dispatch<React.SetStateAction<SessionTypes.RequestEvent[]>>
  results: any[]
  setResults: React.Dispatch<React.SetStateAction<any[]>>
  init: () => Promise<void>
  resetApp: () => Promise<void>
  subscribeToEvents: () => void
  checkPersistedState: () => Promise<void>
  approveAndMakeRequest: (
    requestEvent: SessionTypes.RequestEvent
  ) => Promise<JsonRpcResponse<any>>
  makeRequest: (
    requestEvent: SessionTypes.RequestEvent
  ) => Promise<JsonRpcResponse<any>>
  checkApprovedRequest: (
    request: JsonRpcRequest
  ) => Promise<boolean | undefined>
  onURI: (data: any) => Promise<void>
  getPeerOfRequest: (
    requestEvent: SessionTypes.RequestEvent
  ) => Promise<SessionTypes.Participant>
  approveSession: (
    proposal: SessionTypes.Proposal,
    accounts: AddressAndChain[]
  ) => Promise<void>
  rejectSession: (proposal: SessionTypes.Proposal) => Promise<void>
  disconnect: (topic: string) => Promise<void>
  removeFromPending: (requestEvent: SessionTypes.RequestEvent) => Promise<void>
  respondRequest: (topic: string, response: JsonRpcResponse) => Promise<void>
  approveRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>
  rejectRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>
  onRequestListener: (listener: OnRequestCallback) => void
  autoAcceptIntercept: (listener: AutoAcceptCallback) => void
}

export interface CtxOptions {
  appMetadata: AppMetadata
  chainIds: string[]
  logger: string
  methods: string[]
  relayServer: string
  storageOptions?: KeyValueStorageOptions
}

export const WalletConnectContext = React.createContext(
  {} as IWalletConnectContext
)

export type AddressAndChain = {
  address: string
  chain: string
}

export const WalletConnectContextProvider: React.FC<{
  options: CtxOptions
  children: any
}> = ({options, children}) => {
  const [wcClient, setWcClient] = useState<Client | undefined>(undefined)
  const [storage, setStorage] = useState<KeyValueStorage | undefined>(undefined)
  const [sessionProposals, setSessionProposals] = useState<
    SessionTypes.Proposal[]
    >([])
  const [initialized, setInitialized] = useState<boolean>(false)
  const [chains, setChains] = useState<string[]>(options.chainIds)
  const [sessions, setSessions] = useState<SessionTypes.Created[]>([])
  const [requests, setRequests] = useState<SessionTypes.RequestEvent[]>([])
  const [results, setResults] = useState<any[]>([])
  const [onRequestCallback, setOnRequestCallback] = useState<
    OnRequestCallback | undefined
    >(undefined)
  const [autoAcceptCallback, setAutoAcceptCallback] = useState<
    AutoAcceptCallback | undefined
    >(undefined)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const st = new KeyValueStorage(options.storageOptions)
    setStorage(st)
    setWcClient(
      await Client.init({
        controller: true,
        relayProvider: options.relayServer,
        logger: options.logger,
        storage: st,
      })
    )
  }

  const resetApp = async () => {
    try {
      await Promise.all(
        sessions.map((session) =>
          wcClient?.disconnect({
            topic: session.topic,
            reason: ERROR.USER_DISCONNECTED.format(),
          })
        )
      )
    } catch (e) {
      // ignored
    }

    setWcClient(undefined)
    setSessionProposals([])
    setInitialized(false)
    setChains([])
    setSessions([])
    setRequests([])
    setResults([])
    await clearStorage()
  }

  const clearStorage = async () => {
    const itemsToRemove: string[] = []
    const storageItems = await storage?.getKeys()

    if (!storageItems?.length) {
      return
    }

    for (let i = 0; i < storageItems.length; i++) {
      const wcVal = storageItems[i]
      if (wcVal?.substring(0, 2) === 'wc') {
        itemsToRemove.push(wcVal)
      }
    }

    for (let i = 0; i < itemsToRemove.length; i++) {
      storage?.removeItem(itemsToRemove[i])
    }

    console.log('ACTION', 'CLEAR STORAGE', storage?.getKeys())
  }

  const checkPersistedState = useCallback(async () => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    setSessions(wcClient.session.values)
    setRequests(wcClient.session.history.pending)
    setInitialized(true)
  }, [wcClient])

  // ---- MAKE REQUESTS AND SAVE/CHECK IF APPROVED ------------------------------//

  const onRequestListener = (listener: OnRequestCallback) => {
    setOnRequestCallback(() => listener)
  }

  const autoAcceptIntercept = (listener: AutoAcceptCallback) => {
    setAutoAcceptCallback(() => listener)
  }

  const approveAndMakeRequest = async (
    requestEvent: SessionTypes.RequestEvent
  ) => {
    storage?.setItem(`request-${JSON.stringify(requestEvent.request)}`, true)
    return await makeRequest(requestEvent)
  }

  const makeRequest = useCallback(
    async (requestEvent: SessionTypes.RequestEvent) => {
      const foundSession = findSessionByTopic(requestEvent.topic)
      const acc = foundSession?.state.accounts[0]
      if (!acc) {
        throw new Error('There is no Account')
      }
      const [namespace, reference, address] = acc?.split(':')
      const chainId = `${namespace}:${reference}`
      if (!onRequestCallback) {
        throw new Error('There is no onRequestCallback')
      }
      return await onRequestCallback(address, chainId, requestEvent.request)
    },
    [JSON.stringify(sessions)]
  )

  const checkApprovedRequest = useCallback(
    async (request: JsonRpcRequest) => {
      return storage?.getItem<boolean>(`request-${JSON.stringify(request)}`)
    },
    [storage]
  )

  const respondRequest = useCallback(
    async (topic: string, response: JsonRpcResponse) => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      await wcClient.respond({topic, response})
    },
    [wcClient]
  )

  const subscribeToEvents = useCallback(() => {
    console.log('ACTION', 'subscribeToEvents')

    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }

    wcClient.events.removeAllListeners()

    wcClient.on(
      CLIENT_EVENTS.session.proposal,
      (proposal: SessionTypes.Proposal) => {
        if (typeof wcClient === 'undefined') {
          throw new Error('Client is not initialized')
        }
        console.log('EVENT', 'session_proposal')
        const supportedNamespaces: string[] = []
        chains.forEach((chainId) => {
          const [namespace] = chainId.split(':')
          if (!supportedNamespaces.includes(namespace)) {
            supportedNamespaces.push(namespace)
          }
        })
        const unsupportedChains: string[] = []
        proposal.permissions.blockchain.chains.forEach((chainId) => {
          if (chains.includes(chainId)) return
          unsupportedChains.push(chainId)
        })
        if (unsupportedChains.length) {
          return wcClient.reject({proposal})
        }
        const unsupportedMethods: string[] = []
        proposal.permissions.jsonrpc.methods.forEach((method) => {
          if (options.methods.includes(method)) return
          unsupportedMethods.push(method)
        })
        if (unsupportedMethods.length) {
          return wcClient.reject({proposal})
        }
        setSessionProposals((old) => [...old, proposal])

        return null
      }
    )

    wcClient.on(
      CLIENT_EVENTS.session.request,
      async (requestEvent: SessionTypes.RequestEvent) => {
        // tslint:disable-next-line
        console.log(
          'EVENT',
          CLIENT_EVENTS.session.request,
          requestEvent.request
        )

        const askApproval = () => {
          setRequests((old) => {
            return [
              ...old.filter((i) => i.request.id !== requestEvent.request.id),
              requestEvent,
            ]
          })
        }

        const approve = async () => {
          const response = await makeRequest(requestEvent)
          await respondRequest(requestEvent.topic, response)
        }

        const reject = async (message: string) => {
          const response = formatJsonRpcError(requestEvent.request.id, message)
          await respondRequest(requestEvent.topic, response)
        }

        try {
          const alreadyApproved = await checkApprovedRequest(
            requestEvent.request
          )
          if (alreadyApproved) {
            await approve()
          } else if (autoAcceptCallback) {
            let address: string | undefined = undefined
            let chainId: string | undefined = undefined
            const foundSession = findSessionByTopic(requestEvent.topic)
            const acc = foundSession?.state.accounts[0]
            if (acc) {
              const [namespace, reference, addr] = acc.split(':')
              address = addr
              chainId = `${namespace}:${reference}`
            }
            const autoAccepted = autoAcceptCallback(
              address,
              chainId,
              requestEvent.request
            )
            if (autoAccepted) {
              await approve()
            } else {
              await askApproval()
            }
          } else {
            await askApproval()
          }
        } catch (e) {
          await reject((e as any).message)
        }
      }
    )

    wcClient.on(CLIENT_EVENTS.session.created, () => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      console.log('EVENT', 'session_created')
      setSessions(wcClient.session.values)
    })

    wcClient.on(CLIENT_EVENTS.session.deleted, () => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      console.log('EVENT', 'session_deleted')
      setSessions(wcClient.session.values)
    })
  }, [
    chains,
    checkApprovedRequest,
    makeRequest,
    respondRequest,
    wcClient,
    JSON.stringify(sessions),
  ])

  const findSessionByTopic = useCallback(
    (topic: string) => {
      return sessions.find((session) => session.topic === topic)
    },
    [JSON.stringify(sessions)]
  )

  useEffect(() => {
    if (wcClient) {
      subscribeToEvents()
      checkPersistedState()
    }
  }, [wcClient, subscribeToEvents, checkPersistedState])

  const onURI = async (data: any) => {
    const uri = typeof data === 'string' ? data : ''
    if (!uri) return
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.pair({uri})
  }

  const getPeerOfRequest = async (requestEvent: SessionTypes.RequestEvent) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    const {peer} = await wcClient.session.get(requestEvent.topic)
    return peer
  }

  const approveSession = async (
    proposal: SessionTypes.Proposal,
    accounts: AddressAndChain[]
  ) => {
    console.log('ACTION', 'approveSession')
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    if (typeof accounts === 'undefined') {
      throw new Error('Accounts is undefined')
    }
    const accs = accounts
      .filter((account) => {
        const [namespace, reference] = account.chain.split(':')
        const chainId = `${namespace}:${reference}`
        return proposal.permissions.blockchain.chains.includes(chainId)
      })
      .map((acc) => `${acc.chain}:${acc.address}`)
    const response = {
      state: {accounts: accs},
      metadata: options.appMetadata,
    }
    const session = await wcClient.approve({proposal, response})
    setSessionProposals((old) => old.filter((i) => i !== proposal))
    setSessions((old) => {
      if (
        old.find(
          (oldSession) =>
            oldSession.topic === session.topic &&
            oldSession.state.accounts.some((account) =>
              session.state.accounts.includes(account)
            )
        )
      ) {
        return old
      } else {
        return [...old, session]
      }
    })
  }

  const rejectSession = async (proposal: SessionTypes.Proposal) => {
    console.log('ACTION', 'rejectSession')
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.reject({proposal})
    setSessionProposals((old) => old.filter((i) => i !== proposal))
  }

  const disconnect = async (topic: string) => {
    console.log('ACTION', 'disconnect')
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.disconnect({
      topic,
      reason: ERROR.USER_DISCONNECTED.format(),
    })
  }

  const removeFromPending = async (requestEvent: SessionTypes.RequestEvent) => {
    setRequests(
      requests.filter((x) => x.request.id !== requestEvent.request.id)
    )
  }

  const approveRequest = async (requestEvent: SessionTypes.RequestEvent) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    try {
      const response = await approveAndMakeRequest(requestEvent)
      await wcClient.respond({
        topic: requestEvent.topic,
        response,
      })
    } catch (error) {
      console.error(error)
      await wcClient.respond({
        topic: requestEvent.topic,
        response: formatJsonRpcError(
          requestEvent.request.id,
          'Failed or Rejected Request'
        ),
      })
    }

    await removeFromPending(requestEvent)
  }

  const rejectRequest = async (requestEvent: SessionTypes.RequestEvent) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.respond({
      topic: requestEvent.topic,
      response: formatJsonRpcError(
        requestEvent.request.id,
        'Failed or Rejected Request'
      ),
    })
    await removeFromPending(requestEvent)
  }

  const contextValue: IWalletConnectContext = {
    wcClient,
    setWcClient,
    storage,
    setStorage,
    sessionProposals,
    setSessionProposals,
    initialized,
    setInitialized,
    chains,
    setChains,
    sessions,
    setSessions,
    requests,
    setRequests,
    results,
    setResults,

    init,
    resetApp,
    subscribeToEvents,
    checkPersistedState,
    approveAndMakeRequest,
    makeRequest,
    checkApprovedRequest,
    onURI,
    getPeerOfRequest,
    approveSession,
    rejectSession,
    disconnect,
    removeFromPending,
    respondRequest,
    approveRequest,
    rejectRequest,
    onRequestListener,
    autoAcceptIntercept,
  }

  return (
    <WalletConnectContext.Provider value={contextValue}>
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = (): IWalletConnectContext =>
  useContext(WalletConnectContext)

WalletConnectContextProvider.propTypes = {
  options: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
}
