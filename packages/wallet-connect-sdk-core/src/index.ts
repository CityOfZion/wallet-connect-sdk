import Client, { CLIENT_EVENTS } from '@walletconnect/client'
import { AppMetadata, PairingTypes, SessionTypes } from '@walletconnect/types'
import { ERROR } from '@walletconnect/utils'
import { RequestArguments } from '@walletconnect/jsonrpc-utils'

export interface WcCallbacks {
    onProposal?: (uri: string) => void,
    onCreated?: (topics: string[]) => void,
    onDeleted?: () => void
}

export interface WcConnectOptions {
    topic?: string,
    chainId: string,
    appMetadata: AppMetadata,
    methods: string[]
}

export interface RpcCallResult {
    method: string,
    result: any,
}

export class WcSdk {
    wcClient?: Client
    session?: SessionTypes.Created
    chainId?: string

    async initClient(logger: string, relayServer: string) {
        this.wcClient = await WcSdk.initClient(logger, relayServer)
    }

    subscribeToEvents(callbacks?: WcCallbacks) {
        WcSdk.subscribeToEvents(this.wcClient)
    }

    async loadSession() {
        if (this.wcClient) {
            this.session = await WcSdk.getSession(this.wcClient) || undefined
        }
    }

    async connect(options: WcConnectOptions) {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        this.chainId = options?.chainId
        this.session = await WcSdk.connect(this.wcClient, options)
    }

    getAccountAddress(accountIndex?: number) {
        return this.session ? WcSdk.getAccountAddress(this.session, accountIndex) : null
    }

    async disconnect() {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        await WcSdk.disconnect(this.wcClient, this.session)
    }

    async sendRequest(request: RequestArguments) {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.sendRequest(this.wcClient, this.session, this.chainId, request)
    }

    async invokeFunction(scripthash: string, method: string, params: any[]) {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.invokeFunction(this.wcClient, this.session, this.chainId, scripthash, method, params)
    }

    async testInvoke(scripthash: string, method: string, params: any[]) {
        if (!this.wcClient) {
            throw Error('The client was not initialized')
        }
        if (!this.session) {
            throw Error('No session open')
        }
        if (!this.chainId) {
            throw Error('No chainId informed')
        }
        return await WcSdk.testInvoke(this.wcClient, this.session, this.chainId, scripthash, method, params)
    }

    static async initClient(logger: string, relayProvider: string) {
        return await Client.init({
            logger,
            relayProvider
        })
    }

    static subscribeToEvents(wcClient?: Client, callbacks?: WcCallbacks) {
        if (!wcClient) {
            throw Error('The client was not initialized')
        }

        wcClient.on(
          CLIENT_EVENTS.pairing.proposal,
          async (proposal: PairingTypes.Proposal) => {
              const { uri } = proposal.signal.params

              if (callbacks && callbacks.onProposal) {
                  callbacks.onProposal(uri)
              }
          }
        )

        wcClient.on(CLIENT_EVENTS.pairing.created, async () => {
            if (callbacks && callbacks.onCreated) {
                callbacks.onCreated(wcClient.pairing.topics)
            }
        })

        wcClient.on(CLIENT_EVENTS.session.deleted, async (session: SessionTypes.Settled) => {
            if (session.topic !== session?.topic) return

            if (callbacks && callbacks.onDeleted) {
                callbacks.onDeleted()
            }
        })
    }

    static async getSession(wcClient: Client) {
        if (wcClient?.session.topics.length) {
            return await wcClient.session.get(wcClient.session.topics[0])
        } else {
            return null
        }
    }

    static getAccountAddress(session: SessionTypes.Settled, accountIndex?: number) {
        const index = accountIndex ?? 0
        if (session.state.accounts.length <= index) {
            return null
        }
        const [namespace, reference, senderAddress] = session.state.accounts[index].split(':')
        return senderAddress
    }

    static async connect(wcClient: Client, options: WcConnectOptions) {
        return await wcClient.connect({
            metadata: options.appMetadata,
            pairing: options.topic ? {topic: options.topic} : undefined,
            permissions: {
                blockchain: {
                    chains: [options.chainId],
                },
                jsonrpc: {
                    methods: options.methods,
                },
            },
        })
    }

    static async disconnect(wcClient: Client, session: SessionTypes.Created) {
        await wcClient.disconnect({
            topic: session.topic,
            reason: ERROR.USER_DISCONNECTED.format(),
        })
    }

    static async sendRequest(wcClient: Client, session: SessionTypes.Created, chainId: string, request: RequestArguments): Promise<RpcCallResult> {
        try {
            const result = await wcClient.request({
                topic: session.topic,
                chainId,
                request,
            })

            return {
                method: request.method,
                result,
            }
        } catch (error) {
            return {
                method: request.method,
                result: {error},
            }
        }
    }

    static async invokeFunction(wcClient: Client, session: SessionTypes.Created, chainId: string, scripthash: string, method: string, params: any[]) {
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'invokefunction',
            params: [scripthash, method, params],
        })
    }

    static async testInvoke(wcClient: Client, session: SessionTypes.Created, chainId: string, scripthash: string, method: string, params: any[]) {
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: 'testInvoke',
            params: [scripthash, method, params],
        })
    }
}
