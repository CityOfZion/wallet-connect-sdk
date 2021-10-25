"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletConnect = exports.WalletConnectContextProvider = exports.WalletConnectContext = void 0;
var react_1 = __importStar(require("react"));
var lib_1 = require("@cityofzion/wallet-connect-sdk-core/lib");
var qrcode_modal_1 = __importDefault(require("@walletconnect/qrcode-modal"));
exports.WalletConnectContext = react_1.default.createContext({});
var WalletConnectContextProvider = function (_a) {
    var options = _a.options, children = _a.children;
    var _b = react_1.useState(undefined), wcClient = _b[0], setWcClient = _b[1];
    var _c = react_1.useState(undefined), session = _c[0], setSession = _c[1];
    var _d = react_1.useState(true), loadingSession = _d[0], setLoadingSession = _d[1];
    var _e = react_1.useState([]), pairings = _e[0], setPairings = _e[1];
    var _f = react_1.useState(false), isPairing = _f[0], setIsPairing = _f[1];
    var _g = react_1.useState(false), isPendingApproval = _g[0], setIsPendingApproval = _g[1];
    var _h = react_1.useState(""), uri = _h[0], setUri = _h[1];
    var _j = react_1.useState([]), accounts = _j[0], setAccounts = _j[1];
    var resetApp = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setWcClient(undefined);
                    setSession(undefined);
                    setLoadingSession(true);
                    setPairings([]);
                    setIsPairing(false);
                    setIsPendingApproval(false);
                    setUri("");
                    setAccounts([]);
                    return [4 /*yield*/, initWcClient()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        initWcClient();
    }, []);
    react_1.useEffect(function () {
        if (wcClient) {
            subscribeToEvents();
            checkPersistedState();
        }
    }, [wcClient]);
    var initWcClient = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setWcClient;
                    return [4 /*yield*/, lib_1.WcSdk.initClient(options.logger, options.relayServer)];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); };
    var subscribeToEvents = function () {
        lib_1.WcSdk.subscribeToEvents(wcClient, {
            onProposal: function (uri) {
                setUri(uri);
                qrcode_modal_1.default.open(uri, function () { });
            },
            onCreated: function (topics) { return setPairings(topics); },
            onDeleted: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resetApp()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }
        });
    };
    var checkPersistedState = function () { return __awaiter(void 0, void 0, void 0, function () {
        var s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wcClient) {
                        throw new Error("WalletConnect is not initialized");
                    }
                    setPairings(wcClient.pairing.topics);
                    if (session)
                        return [2 /*return*/];
                    return [4 /*yield*/, lib_1.WcSdk.getSession(wcClient)];
                case 1:
                    s = _a.sent();
                    if (s) {
                        onSessionConnected(session);
                    }
                    setLoadingSession(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var onSessionConnected = function (session) {
        setSession(session);
        setAccounts(session.state.accounts);
    };
    var connect = function (topic) { return __awaiter(void 0, void 0, void 0, function () {
        var session_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wcClient) {
                        throw new Error("WalletConnect is not initialized");
                    }
                    setIsPairing(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, lib_1.WcSdk.connect(wcClient, __assign({ topic: topic }, options))];
                case 2:
                    session_1 = _a.sent();
                    onSessionConnected(session_1);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    // close modal in case it was open
                    qrcode_modal_1.default.close();
                    return [2 /*return*/];
            }
        });
    }); };
    var disconnect = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wcClient) {
                        throw new Error("WalletConnect is not initialized");
                    }
                    if (!session) {
                        throw new Error("Session is not connected");
                    }
                    return [4 /*yield*/, lib_1.WcSdk.disconnect(wcClient, session)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, resetApp()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var openPairing = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wcClient) {
                        throw new Error("WalletConnect is not initialized");
                    }
                    if (wcClient.pairing.topics.length) {
                        setIsPairing(true);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleRequest = function (caller) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!wcClient) {
                        throw new Error("WalletConnect is not initialized");
                    }
                    if (!session) {
                        throw new Error("Session is not connected");
                    }
                    setIsPendingApproval(true);
                    return [4 /*yield*/, caller()];
                case 1:
                    resp = _a.sent();
                    setIsPendingApproval(false);
                    return [2 /*return*/, resp];
            }
        });
    }); };
    var sendRequest = function (request) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleRequest(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, lib_1.WcSdk.sendRequest(wcClient, session, options.chainId, request)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var invokeFunction = function (scripthash, method, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleRequest(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, lib_1.WcSdk.invokeFunction(wcClient, session, options.chainId, scripthash, method, params)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var contextValue = {
        wcClient: wcClient,
        setWcClient: setWcClient,
        session: session,
        setSession: setSession,
        loadingSession: loadingSession,
        setLoadingSession: setLoadingSession,
        pairings: pairings,
        setPairings: setPairings,
        isPairing: isPairing,
        setIsPairing: setIsPairing,
        isPendingApproval: isPendingApproval,
        setIsPendingApproval: setIsPendingApproval,
        uri: uri,
        setUri: setUri,
        accounts: accounts,
        setAccounts: setAccounts,
        openPairing: openPairing,
        connect: connect,
        sendRequest: sendRequest,
        invokeFunction: invokeFunction,
        disconnect: disconnect,
    };
    return (react_1.default.createElement(exports.WalletConnectContext.Provider, { value: contextValue }, children));
};
exports.WalletConnectContextProvider = WalletConnectContextProvider;
var useWalletConnect = function () { return react_1.useContext(exports.WalletConnectContext); };
exports.useWalletConnect = useWalletConnect;
