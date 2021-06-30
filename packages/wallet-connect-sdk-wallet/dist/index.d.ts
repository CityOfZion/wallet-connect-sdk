import React from 'react';
import Client from "@walletconnect/client";
import { AppMetadata, SessionTypes } from "@walletconnect/types";
import KeyValueStorage from "keyvaluestorage";
import { JsonRpcRequest, JsonRpcResponse } from "@json-rpc-tools/utils";
declare type OnRequestCallback = (accountAddress: string, chainId: string, request: JsonRpcRequest) => Promise<JsonRpcResponse>;
interface IWalletConnectContext {
    wcClient: Client | undefined;
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
    storage: KeyValueStorage | undefined;
    setStorage: React.Dispatch<React.SetStateAction<KeyValueStorage | undefined>>;
    sessionProposals: SessionTypes.Proposal[];
    setSessionProposals: React.Dispatch<React.SetStateAction<SessionTypes.Proposal[]>>;
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
    chains: string[];
    setChains: React.Dispatch<React.SetStateAction<string[]>>;
    sessions: SessionTypes.Created[];
    setSessions: React.Dispatch<React.SetStateAction<SessionTypes.Created[]>>;
    requests: SessionTypes.RequestEvent[];
    setRequests: React.Dispatch<React.SetStateAction<SessionTypes.RequestEvent[]>>;
    results: any[];
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
    init: () => Promise<void>;
    resetApp: () => Promise<void>;
    subscribeToEvents: () => void;
    checkPersistedState: () => Promise<void>;
    approveAndMakeRequest: (request: JsonRpcRequest) => Promise<JsonRpcResponse<any>>;
    makeRequest: (request: JsonRpcRequest) => Promise<JsonRpcResponse<any>>;
    checkApprovedRequest: (request: JsonRpcRequest) => Promise<boolean | undefined>;
    onURI: (data: any) => Promise<void>;
    getPeerOfRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<SessionTypes.Peer>;
    approveSession: (proposal: SessionTypes.Proposal) => Promise<void>;
    rejectSession: (proposal: SessionTypes.Proposal) => Promise<void>;
    disconnect: (topic: string) => Promise<void>;
    removeFromPending: (requestEvent: SessionTypes.RequestEvent) => Promise<void>;
    respondRequest: (topic: string, response: JsonRpcResponse) => Promise<void>;
    approveRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>;
    rejectRequest: (requestEvent: SessionTypes.RequestEvent) => Promise<void>;
    onRequestListener: (listener: OnRequestCallback) => void;
    addAccountAndChain: (address: string, chain: string) => void;
    removeAccountAndChain: (address: string, chain: string) => void;
    clearAccountAndChain: () => void;
}
export interface CtxOptions {
    appMetadata: AppMetadata;
    chainIds: string[];
    logger: string;
    methods: string[];
    relayServer: string;
}
export declare const WalletConnectContext: React.Context<IWalletConnectContext>;
export declare const WalletConnectContextProvider: React.FC<{
    options: CtxOptions;
    children: any;
}>;
export declare const useWalletConnect: () => IWalletConnectContext;
export {};
