"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletConnect = exports.WalletConnectContextProvider = exports.WalletConnectContext = void 0;
const react_1 = require("react");
const lib_1 = require("@cityofzion/wallet-connect-sdk-core/lib");
const qrcode_modal_1 = require("@walletconnect/qrcode-modal");
exports.WalletConnectContext = react_1.default.createContext({});
const WalletConnectContextProvider = ({ options, children }) => {
    const [wcClient, setWcClient] = react_1.useState(undefined);
    const [session, setSession] = react_1.useState(undefined);
    const [loadingSession, setLoadingSession] = react_1.useState(true);
    const [pairings, setPairings] = react_1.useState([]);
    const [isPairing, setIsPairing] = react_1.useState(false);
    const [isPendingApproval, setIsPendingApproval] = react_1.useState(false);
    const [uri, setUri] = react_1.useState("");
    const [accounts, setAccounts] = react_1.useState([]);
    const resetApp = () => __awaiter(void 0, void 0, void 0, function* () {
        setWcClient(undefined);
        setSession(undefined);
        setLoadingSession(true);
        setPairings([]);
        setIsPairing(false);
        setIsPendingApproval(false);
        setUri("");
        setAccounts([]);
        yield initWcClient();
    });
    react_1.useEffect(() => {
        initWcClient();
    }, []);
    react_1.useEffect(() => {
        if (wcClient) {
            subscribeToEvents();
            checkPersistedState();
        }
    }, [wcClient]);
    const initWcClient = () => __awaiter(void 0, void 0, void 0, function* () {
        setWcClient(yield lib_1.WcSdk.initClient(options.logger, options.relayServer));
    });
    const subscribeToEvents = () => {
        lib_1.WcSdk.subscribeToEvents(wcClient, {
            onProposal: uri => {
                setUri(uri);
                qrcode_modal_1.default.open(uri, () => { });
            },
            onCreated: topics => setPairings(topics),
            onDeleted: () => __awaiter(void 0, void 0, void 0, function* () { return yield resetApp(); })
        });
    };
    const checkPersistedState = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        setPairings(wcClient.pairing.topics);
        if (session)
            return;
        const s = yield lib_1.WcSdk.getSession(wcClient);
        if (s) {
            onSessionConnected(session);
        }
        setLoadingSession(false);
    });
    const onSessionConnected = (session) => {
        setSession(session);
        setAccounts(session.state.accounts);
    };
    const connect = (topic) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        setIsPairing(false);
        try {
            const session = yield lib_1.WcSdk.connect(wcClient, Object.assign({ topic }, options));
            onSessionConnected(session);
        }
        catch (e) {
        }
        qrcode_modal_1.default.close();
    });
    const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (!session) {
            throw new Error("Session is not connected");
        }
        yield lib_1.WcSdk.disconnect(wcClient, session);
        yield resetApp();
    });
    const openPairing = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (wcClient.pairing.topics.length) {
            setIsPairing(true);
            return;
        }
        yield connect();
    });
    const handleRequest = (caller) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wcClient) {
            throw new Error("WalletConnect is not initialized");
        }
        if (!session) {
            throw new Error("Session is not connected");
        }
        setIsPendingApproval(true);
        const resp = yield caller();
        setIsPendingApproval(false);
        return resp;
    });
    const sendRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
        return yield handleRequest(() => __awaiter(void 0, void 0, void 0, function* () { return yield lib_1.WcSdk.sendRequest(wcClient, session, options.chainId, request); }));
    });
    const invokeFunction = (scripthash, method, params) => __awaiter(void 0, void 0, void 0, function* () {
        return yield handleRequest(() => __awaiter(void 0, void 0, void 0, function* () { return yield lib_1.WcSdk.invokeFunction(wcClient, session, options.chainId, scripthash, method, params); }));
    });
    const contextValue = {
        wcClient,
        setWcClient,
        session,
        setSession,
        loadingSession,
        setLoadingSession,
        pairings,
        setPairings,
        isPairing,
        setIsPairing,
        isPendingApproval,
        setIsPendingApproval,
        uri,
        setUri,
        accounts,
        setAccounts,
        openPairing,
        connect,
        sendRequest,
        invokeFunction,
        disconnect,
    };
    return (react_1.default.createElement(exports.WalletConnectContext.Provider, { value: contextValue }, children));
};
exports.WalletConnectContextProvider = WalletConnectContextProvider;
const useWalletConnect = () => react_1.useContext(exports.WalletConnectContext);
exports.useWalletConnect = useWalletConnect;
//# sourceMappingURL=index.js.map