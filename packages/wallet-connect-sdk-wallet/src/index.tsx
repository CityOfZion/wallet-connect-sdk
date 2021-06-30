import React, {useCallback, useContext, useEffect, useState} from 'react';
import Client from "@walletconnect/client";
import {CLIENT_EVENTS} from "@walletconnect/client/dist/cjs/constants/client";
import {AppMetadata, SessionTypes} from "@walletconnect/types";
import {ERROR, getError} from "@walletconnect/utils/dist/cjs/error";
import {getAppMetadata} from "@walletconnect/utils/dist/cjs/misc";
import KeyValueStorage from "keyvaluestorage";
import {JsonRpcRequest, JsonRpcResponse} from "@json-rpc-tools/utils";
import {formatJsonRpcError} from "@json-rpc-tools/utils/dist/cjs/format";

type OnRequestCallback = (accountAddress: string, chainId: string, request: JsonRpcRequest) => Promise<JsonRpcResponse>

interface IWalletConnectContext {
    wcClient: Client | undefined,
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>,
    storage: KeyValueStorage | undefined,
    setStorage: React.Dispatch<React.SetStateAction<KeyValueStorage | undefined>>,
    sessionProposals: SessionTypes.Proposal[],
    setSessionProposals: React.Dispatch<React.SetStateAction<SessionTypes.Proposal[]>>,
    initialized: boolean,
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>,
    chains: string[],
    setChains: React.Dispatch<React.SetStateAction<string[]>>,
    sessions: SessionTypes.Created[],
    setSessions: React.Dispatch<React.SetStateAction<SessionTypes.Created[]>>,
    requests: SessionTypes.RequestEvent[],
    setRequests: React.Dispatch<React.SetStateAction<SessionTypes.RequestEvent[]>>,
    results: any[],
    setResults: React.Dispatch<React.SetStateAction<any[]>>,

    init: () => Promise<void>,
    resetApp: () => Promise<void>,
    subscribeToEvents: () => void,
    checkPersistedState: () => Promise<void>,
    approveAndMakeRequest: (request: JsonRpcRequest) => Promise<JsonRpcResponse<any>>,
    makeRequest: (request: JsonRpcRequest) => Promise<JsonRpcResponse<any>>,
    checkApprovedRequest: (request: JsonRpcRequest) => Promise<boolean | undefined>,
    onURI: (data: any) => Promise<void>,
    getPeerOfRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<SessionTypes.Peer>,
    approveSession: (proposal: SessionTypes.Proposal) => Promise<void>,
    rejectSession: (proposal: SessionTypes.Proposal) => Promise<void>,
    disconnect: (topic: string) => Promise<void>,
    removeFromPending: (requestEvent: SessionTypes.RequestEvent) => Promise<void>,
    respondRequest: (topic: string, response: JsonRpcResponse) => Promise<void>,
    approveRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>,
    rejectRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>,
    onRequestListener: (listener: OnRequestCallback) => void,
    addAccountAndChain: (address: string, chain: string) => void,
    removeAccountAndChain: (address: string, chain: string) => void,
    clearAccountAndChain: () => void,
}

export interface CtxOptions {
    appMetadata: AppMetadata,
    chainIds: string[],
    logger: string,
    methods: string[],
    relayServer: string,
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectContextProvider: React.FC<{ options: CtxOptions, children: any }> = ({ options, children }) => {
    const [wcClient, setWcClient] = useState<Client | undefined>(undefined)
    const [storage, setStorage] = useState<KeyValueStorage | undefined>(undefined)
    const [sessionProposals, setSessionProposals] = useState<SessionTypes.Proposal[]>([])
    const [initialized, setInitialized] = useState<boolean>(false)
    const [chains, setChains] = useState<string[]>(options.chainIds)
    const [accounts, setAccounts] = useState<string[]>([])
    const [sessions, setSessions] = useState<SessionTypes.Created[]>([])
    const [requests, setRequests] = useState<SessionTypes.RequestEvent[]>([])
    const [results, setResults] = useState<any[]>([])
    const [onRequestCallback, setOnRequestCallback] = useState<OnRequestCallback | undefined>(undefined)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const st = new KeyValueStorage()
        setStorage(st)
        setWcClient(await Client.init({
            controller: true,
            relayProvider: options.relayServer,
            logger: options.logger,
            storage: st,
        }));
    };

    const resetApp = async () => {
        setWcClient(undefined)
        setSessionProposals([])
        setInitialized(false)
        setChains([])
        setAccounts([])
        setSessions([])
        setRequests([])
        setResults([])
    }

    const checkPersistedState = useCallback(async () => {
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        setSessions(wcClient.session.values)
        setRequests(wcClient.session.history.pending)
        setInitialized(true)
    }, [wcClient]);

    // ---- MAKE REQUESTS AND SAVE/CHECK IF APPROVED ------------------------------//

    const onRequestListener = (listener: OnRequestCallback) => {
        setOnRequestCallback(() => listener)
    }

    const approveAndMakeRequest = async (request: JsonRpcRequest) => {
        storage?.setItem(`request-${JSON.stringify(request)}`, true)
        return await makeRequest(request)
    }

    const makeRequest = useCallback(async (request: JsonRpcRequest) => {
        // TODO: allow multiple accounts
        const [address, chainId] = accounts[0].split('@')
        if (!onRequestCallback) {
            throw new Error("There is no onRequestCallback")
        }
        return await onRequestCallback(address, chainId, request);
    }, [accounts])

    const checkApprovedRequest = useCallback(async (request: JsonRpcRequest) => {
        return storage?.getItem<boolean>(`request-${JSON.stringify(request)}`);
    }, [storage])

    const respondRequest = useCallback(async (topic: string, response: JsonRpcResponse) => {
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        await wcClient.respond({topic, response});
    }, [wcClient]);

    const subscribeToEvents = useCallback(() => {
        console.log("ACTION", "subscribeToEvents");

        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }

        wcClient.on(CLIENT_EVENTS.session.proposal, (proposal: SessionTypes.Proposal) => {
            if (typeof wcClient === "undefined") {
                throw new Error("Client is not initialized");
            }
            console.log("EVENT", "session_proposal");
            const unsupportedChains: string[] = [];
            proposal.permissions.blockchain.chains.forEach(chainId => {
                if (chains.includes(chainId)) return;
                unsupportedChains.push(chainId);
            });
            if (unsupportedChains.length) {
                return wcClient.reject({proposal});
            }
            const unsupportedMethods: string[] = [];
            proposal.permissions.jsonrpc.methods.forEach(method => {
                if (options.methods.includes(method)) return;
                unsupportedMethods.push(method);
            });
            if (unsupportedMethods.length) {
                return wcClient.reject({proposal});
            }
            setSessionProposals((old) => [...old, proposal]);

            return null;
        });

        wcClient.on(
          CLIENT_EVENTS.session.request,
          async (requestEvent: SessionTypes.RequestEvent) => {
              // tslint:disable-next-line
              console.log("EVENT", CLIENT_EVENTS.session.request, requestEvent.request);
              try {
                  const alreadyApproved = await checkApprovedRequest(requestEvent.request);
                  if (!alreadyApproved) {
                      setRequests((old) => {
                          return [
                              ...(old.filter((i) => i.request.id !== requestEvent.request.id)),
                              requestEvent
                          ]
                      })
                  } else {
                      const response = await makeRequest(requestEvent.request)
                      await respondRequest(requestEvent.topic, response);
                  }
              } catch (e) {
                  const response = formatJsonRpcError(requestEvent.request.id, e.message);
                  await respondRequest(requestEvent.topic, response);
              }
          },
        );

        wcClient.on(CLIENT_EVENTS.session.created, () => {
            if (typeof wcClient === "undefined") {
                throw new Error("Client is not initialized");
            }
            console.log("EVENT", "session_created");
            setSessions(wcClient.session.values)
        });

        wcClient.on(CLIENT_EVENTS.session.deleted, () => {
            if (typeof wcClient === "undefined") {
                throw new Error("Client is not initialized");
            }
            console.log("EVENT", "session_deleted");
            setSessions(wcClient.session.values)
        });
    }, [chains, checkApprovedRequest, makeRequest, respondRequest, wcClient]);

    useEffect(() => {
        if (wcClient) {
            subscribeToEvents()
            checkPersistedState()
        }
    }, [wcClient, subscribeToEvents, checkPersistedState])

    const onURI = async (data: any) => {
        const uri = typeof data === "string" ? data : "";
        if (!uri) return;
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        await wcClient.pair({uri});
    };

    const getPeerOfRequest = async (requestEvent: SessionTypes.RequestEvent) => {
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        const {peer} = await wcClient.session.get(requestEvent.topic);
        return peer
    };

    const approveSession = async (proposal: SessionTypes.Proposal) => {
        console.log("ACTION", "approveSession");
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        if (typeof accounts === "undefined") {
            throw new Error("Accounts is undefined");
        }
        const accs = accounts.filter(account => {
            const chainId = account.split("@")[1];
            return proposal.permissions.blockchain.chains.includes(chainId);
        });
        const response = {
            state: {accounts: accs},
            metadata: getAppMetadata() || options.appMetadata,
        };
        const session = await wcClient.approve({proposal, response});
        setSessionProposals((old) => old.filter(i => i !== proposal))
        setSessions([session]);
    };

    const rejectSession = async (proposal: SessionTypes.Proposal) => {
        console.log("ACTION", "rejectSession");
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        await wcClient.reject({proposal});
        setSessionProposals((old) => old.filter(i => i !== proposal))
    };

    const disconnect = async (topic: string) => {
        console.log("ACTION", "disconnect");
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        await wcClient.disconnect({
            topic,
            reason: getError(ERROR.USER_DISCONNECTED),
        });
    };

    const removeFromPending = async (requestEvent: SessionTypes.RequestEvent) => {
        setRequests(requests.filter(x => x.request.id !== requestEvent.request.id));
    };

    const approveRequest = async (requestEvent: SessionTypes.RequestEvent) => {
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        try {
            const response = await approveAndMakeRequest(requestEvent.request)
            await wcClient.respond({
                topic: requestEvent.topic,
                response,
            });
        } catch (error) {
            console.error(error);
            await wcClient.respond({
                topic: requestEvent.topic,
                response: formatJsonRpcError(requestEvent.request.id, "Failed or Rejected Request"),
            });
        }

        await removeFromPending(requestEvent);
    };

    const rejectRequest = async (requestEvent: SessionTypes.RequestEvent) => {
        if (typeof wcClient === "undefined") {
            throw new Error("Client is not initialized");
        }
        await wcClient.respond({
            topic: requestEvent.topic,
            response: formatJsonRpcError(requestEvent.request.id, "Failed or Rejected Request"),
        });
        await removeFromPending(requestEvent);
    };

    const addAccountAndChain = (address: string, chain: string) => {
        setAccounts((oldAccs) => [...oldAccs, `${address}@${chain}`])
    }

    const removeAccountAndChain = (address: string, chain: string) => {
        setAccounts((oldAccs) => [...oldAccs.filter((acc) => acc !== `${address}@${chain}`)])
    }

    const clearAccountAndChain = () => {
        setAccounts([])
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
        addAccountAndChain,
        removeAccountAndChain,
        clearAccountAndChain,
    }

    return (
      <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
    );
}

export const useWalletConnect = (): IWalletConnectContext => useContext(WalletConnectContext)