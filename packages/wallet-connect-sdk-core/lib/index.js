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
exports.WcSdk = void 0;
const cjs_1 = require("@walletconnect/client/dist/cjs");
const error_1 = require("@walletconnect/utils/dist/cjs/error");
class WcSdk {
    initClient(logger, relayServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.wcClient = yield WcSdk.initClient(logger, relayServer);
        });
    }
    subscribeToEvents(callbacks) {
        WcSdk.subscribeToEvents(this.wcClient, callbacks);
    }
    loadSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wcClient) {
                this.session = (yield WcSdk.getSession(this.wcClient)) || undefined;
            }
        });
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            this.session = yield WcSdk.connect(this.wcClient, options);
        });
    }
    getAccountAddress(accountIndex) {
        return this.session ? WcSdk.getAccountAddress(this.session, accountIndex) : null;
    }
    get chainId() {
        return this.session ? WcSdk.getChainId(this.session) : null;
    }
    get accountAddress() {
        return this.session ? WcSdk.getAccountAddress(this.session) : null;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            yield WcSdk.disconnect(this.wcClient, this.session);
        });
    }
    sendRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            if (!this.chainId) {
                throw Error('No chainId informed');
            }
            return yield WcSdk.sendRequest(this.wcClient, this.session, this.chainId, request);
        });
    }
    invokeFunction(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            if (!this.chainId) {
                throw Error('No chainId informed');
            }
            return yield WcSdk.invokeFunction(this.wcClient, this.session, this.chainId, request);
        });
    }
    testInvoke(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            if (!this.chainId) {
                throw Error('No chainId informed');
            }
            return yield WcSdk.testInvoke(this.wcClient, this.session, this.chainId, request);
        });
    }
    multiInvoke(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            if (!this.chainId) {
                throw Error('No chainId informed');
            }
            return yield WcSdk.multiInvoke(this.wcClient, this.session, this.chainId, request);
        });
    }
    multiTestInvoke(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wcClient) {
                throw Error('The client was not initialized');
            }
            if (!this.session) {
                throw Error('No session open');
            }
            if (!this.chainId) {
                throw Error('No chainId informed');
            }
            return yield WcSdk.multiTestInvoke(this.wcClient, this.session, this.chainId, request);
        });
    }
    static initClient(logger, relayProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cjs_1.default.init({
                logger,
                relayProvider
            });
        });
    }
    static subscribeToEvents(wcClient, callbacks) {
        if (!wcClient) {
            throw Error('The client was not initialized');
        }
        wcClient.on(cjs_1.CLIENT_EVENTS.pairing.proposal, (proposal) => __awaiter(this, void 0, void 0, function* () {
            const { uri } = proposal.signal.params;
            if (callbacks && callbacks.onProposal) {
                callbacks.onProposal(uri);
            }
        }));
        wcClient.on(cjs_1.CLIENT_EVENTS.pairing.created, () => __awaiter(this, void 0, void 0, function* () {
            if (callbacks && callbacks.onCreated) {
                callbacks.onCreated(wcClient.pairing.topics);
            }
        }));
        wcClient.on(cjs_1.CLIENT_EVENTS.session.deleted, (session) => __awaiter(this, void 0, void 0, function* () {
            if (session.topic !== (session === null || session === void 0 ? void 0 : session.topic))
                return;
            if (callbacks && callbacks.onDeleted) {
                callbacks.onDeleted();
            }
        }));
    }
    static getSession(wcClient) {
        return __awaiter(this, void 0, void 0, function* () {
            if (wcClient === null || wcClient === void 0 ? void 0 : wcClient.session.topics.length) {
                return yield wcClient.session.get(wcClient.session.topics[0]);
            }
            else {
                return null;
            }
        });
    }
    static getAccountInfo(session, accountIndex) {
        const index = accountIndex !== null && accountIndex !== void 0 ? accountIndex : 0;
        if (session.state.accounts.length <= index) {
            return null;
        }
        return session.state.accounts[index].split(':');
    }
    static getAccountAddress(session, accountIndex) {
        const info = WcSdk.getAccountInfo(session, accountIndex);
        return info && info[2];
    }
    static getChainId(session, accountIndex) {
        const info = WcSdk.getAccountInfo(session, accountIndex);
        return info && `${info[0]}:${info[1]}`;
    }
    static connect(wcClient, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield wcClient.connect({
                metadata: options.appMetadata,
                pairing: options.topic ? { topic: options.topic } : undefined,
                permissions: {
                    blockchain: {
                        chains: (_a = options.chains) !== null && _a !== void 0 ? _a : (options.chainId ? [options.chainId] : [])
                    },
                    jsonrpc: {
                        methods: options.methods,
                    },
                },
            });
        });
    }
    static disconnect(wcClient, session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield wcClient.disconnect({
                topic: session.topic,
                reason: error_1.ERROR.USER_DISCONNECTED.format(),
            });
        });
    }
    static sendRequest(wcClient, session, chainId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wcClient.request({
                    topic: session.topic,
                    chainId,
                    request,
                });
                return {
                    method: request.method,
                    result,
                };
            }
            catch (error) {
                return {
                    method: request.method,
                    result: { error },
                };
            }
        });
    }
    static invokeFunction(wcClient, session, chainId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return WcSdk.sendRequest(wcClient, session, chainId, {
                method: 'invokefunction',
                params: [request],
            });
        });
    }
    static testInvoke(wcClient, session, chainId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return WcSdk.sendRequest(wcClient, session, chainId, {
                method: 'testInvoke',
                params: [request],
            });
        });
    }
    static multiInvoke(wcClient, session, chainId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return WcSdk.sendRequest(wcClient, session, chainId, {
                method: 'multiInvoke',
                params: request,
            });
        });
    }
    static multiTestInvoke(wcClient, session, chainId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return WcSdk.sendRequest(wcClient, session, chainId, {
                method: 'multiTestInvoke',
                params: request,
            });
        });
    }
}
exports.WcSdk = WcSdk;
//# sourceMappingURL=index.js.map