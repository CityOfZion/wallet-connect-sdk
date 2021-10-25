import React from "react";
import { AppMetadata } from "@walletconnect/types";
export interface CtxOptions {
    appMetadata: AppMetadata;
    chainId: string;
    logger: string;
    methods: string[];
    relayServer: string;
}
export declare const WalletConnectContext: any;
export declare const WalletConnectContextProvider: React.FC<{
    options: CtxOptions;
    children: any;
}>;
export declare const useWalletConnect: () => any;
