import Client from '@walletconnect/client/dist/cjs';
import { AppMetadata, SessionTypes } from '@walletconnect/types/dist/cjs';
import { RequestArguments } from '@walletconnect/jsonrpc-utils';
export interface WcCallbacks {
    onProposal?: (uri: string) => void;
    onCreated?: (topics: string[]) => void;
    onDeleted?: () => void;
}
export interface WcConnectOptions {
    topic?: string;
    chainId?: string;
    chains?: string[];
    appMetadata: AppMetadata;
    methods: string[];
}
export interface RpcCallResult {
    method: string;
    result: any;
}
export declare type ContractInvocation = {
    scriptHash: string;
    operation: string;
    args: any[];
    abortOnFail?: boolean;
};
export declare class WcSdk {
    wcClient?: Client;
    session?: SessionTypes.Created;
    initClient(logger: string, relayServer: string): Promise<void>;
    subscribeToEvents(callbacks?: WcCallbacks): void;
    loadSession(): Promise<void>;
    connect(options: WcConnectOptions): Promise<void>;
    getAccountAddress(accountIndex?: number): string;
    get chainId(): string;
    get accountAddress(): string;
    disconnect(): Promise<void>;
    sendRequest(request: RequestArguments): Promise<RpcCallResult>;
    invokeFunction(request: ContractInvocation): Promise<RpcCallResult>;
    testInvoke(request: ContractInvocation): Promise<RpcCallResult>;
    multiInvoke(request: ContractInvocation[]): Promise<RpcCallResult>;
    multiTestInvoke(request: ContractInvocation[]): Promise<RpcCallResult>;
    static initClient(logger: string, relayProvider: string): Promise<Client>;
    static subscribeToEvents(wcClient?: Client, callbacks?: WcCallbacks): void;
    static getSession(wcClient: Client): Promise<SessionTypes.Settled>;
    static getAccountInfo(session: SessionTypes.Settled, accountIndex?: number): string[];
    static getAccountAddress(session: SessionTypes.Settled, accountIndex?: number): string;
    static getChainId(session: SessionTypes.Settled, accountIndex?: number): string;
    static connect(wcClient: Client, options: WcConnectOptions): Promise<SessionTypes.Settled>;
    static disconnect(wcClient: Client, session: SessionTypes.Created): Promise<void>;
    static sendRequest(wcClient: Client, session: SessionTypes.Created, chainId: string, request: RequestArguments): Promise<RpcCallResult>;
    static invokeFunction(wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocation): Promise<RpcCallResult>;
    static testInvoke(wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocation): Promise<RpcCallResult>;
    static multiInvoke(wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocation[]): Promise<RpcCallResult>;
    static multiTestInvoke(wcClient: Client, session: SessionTypes.Created, chainId: string, request: ContractInvocation[]): Promise<RpcCallResult>;
}
