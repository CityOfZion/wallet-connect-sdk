import React from "react";
import Client from "@walletconnect/client";
import { AppMetadata, SessionTypes } from "@walletconnect/types";
import { RpcCallResult } from "@cityofzion/wallet-connect-sdk-core/lib";
import { RequestArguments } from "@json-rpc-tools/types";
interface IWalletConnectContext {
    wcClient: Client | undefined;
    setWcClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
    session: SessionTypes.Created | undefined;
    setSession: React.Dispatch<React.SetStateAction<SessionTypes.Created | undefined>>;
    loadingSession: boolean;
    setLoadingSession: React.Dispatch<React.SetStateAction<boolean>>;
    pairings: string[];
    setPairings: React.Dispatch<React.SetStateAction<string[]>>;
    isPairing: boolean;
    setIsPairing: React.Dispatch<React.SetStateAction<boolean>>;
    isPendingApproval: boolean;
    setIsPendingApproval: React.Dispatch<React.SetStateAction<boolean>>;
    uri: string;
    setUri: React.Dispatch<React.SetStateAction<string>>;
    accounts: string[];
    setAccounts: React.Dispatch<React.SetStateAction<string[]>>;
    openPairing: () => Promise<void>;
    connect: (topic?: string) => Promise<void>;
    sendRequest: (request: RequestArguments) => Promise<RpcCallResult>;
    invokeFunction: (scripthash: string, method: string, params: any[]) => Promise<RpcCallResult>;
    disconnect: () => Promise<void>;
}
export interface CtxOptions {
    appMetadata: AppMetadata;
    chainId: string;
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
