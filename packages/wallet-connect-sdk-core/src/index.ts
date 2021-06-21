import Client, {CLIENT_EVENTS} from "@walletconnect/client";
import {AppMetadata, PairingTypes, SessionTypes} from "@walletconnect/types";
import {ERROR, getAppMetadata, getError} from "@walletconnect/utils";
import {RequestArguments} from "@json-rpc-tools/types";
import elliptic from 'elliptic'
import * as crypto from 'crypto'

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
        this.session = await WcSdk.getSession(this.wcClient)
    }

    async connect(options?: WcConnectOptions) {
        this.chainId = options?.chainId
        this.session = await WcSdk.connect(this.wcClient, options)
    }

    async disconnect() {
        await WcSdk.disconnect(this.wcClient, this.session)
    }

    async sendRequest(request: RequestArguments) {
        return await WcSdk.sendRequest(this.wcClient, this.session, this.chainId, request)
    }

    async invokeFunction(scripthash: string, method: string, params: any[]) {
        return await WcSdk.invokeFunction(this.wcClient, this.session, this.chainId, scripthash, method, params)
    }

    static async initClient(logger: string, relayServer: string) {
        return await Client.init({
            logger,
            relayProvider: relayServer,
        })
    }

    static subscribeToEvents(wcClient?: Client, callbacks?: WcCallbacks) {
        if (!wcClient) {
            return
        }

        if (callbacks && callbacks.onProposal) {
            wcClient.on(
                CLIENT_EVENTS.pairing.proposal,
                async (proposal: PairingTypes.Proposal) => {
                    const {uri} = proposal.signal.params
                    callbacks.onProposal(uri)
                },
            )
        }

        if (callbacks && callbacks.onCreated) {
            wcClient.on(CLIENT_EVENTS.pairing.created, async () => {
                callbacks.onCreated(wcClient.pairing.topics)
            })
        }

        if (callbacks && callbacks.onDeleted) {
            wcClient.on(CLIENT_EVENTS.session.deleted, async (session: SessionTypes.Settled) => {
                if (session.topic !== session?.topic) return
                callbacks.onDeleted()
            })
        }
    }

    static async getSession(wcClient: Client) {
        if (wcClient?.session.topics.length) {
            return await wcClient.session.get(wcClient.session.topics[0])
        } else {
            return null
        }
    }

    static async connect(wcClient: Client, options?: WcConnectOptions) {
        return await wcClient.connect({
            metadata: getAppMetadata() || options.appMetadata,
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
            reason: getError(ERROR.USER_DISCONNECTED),
        })
    }

    static async sendRequest(wcClient: Client, session: SessionTypes.Created, chainId: string, request: RequestArguments): Promise<RpcCallResult> {
        try {
            const result = await wcClient.request({
                topic: session.topic,
                chainId,
                request,
            });

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
    };

    static async invokeFunction(wcClient: Client, session: SessionTypes.Created, chainId: string, scripthash: string, method: string, params: any[]) {
        return WcSdk.sendRequest(wcClient, session, chainId, {
            method: "invokefunction",
            params: [scripthash, method, params],
        })
    }

    // static encryptionp256ECIES(addresses: string[], message: string) {
    //     // this is all wrong, I was just speculating, the method signatures doesn't match https://github.com/indutny/elliptic#ecdh
    //     var ec = new elliptic.ec.EC('curve25519');
    //     const k = ec.genKeyPair()
    //     const shared = k.deriveKey(addresses[0])
    //     return WcSdk.p256ECIESEncrypt(addresses[0], Buffer.from(message)).ciphertext
    // }
    //
    // static p256ECIESEncrypt(publicKey: string, payload: Buffer, opts?: any) {
    //     const curve = new elliptic.ec('p256')
    //
    //     const pub = curve.keyFromPublic(publicKey, 'hex').getPublic()
    //
    //     const op = opts || {}
    //
    //     const ephem = curve.genKeyPair()
    //     const ephemPublicKey = ephem.getPublic(true, 'hex')
    //
    //     // create the shared ECHD secret
    //     const px = ephem.derive(pub)
    //
    //     // hash the secret
    //     const hash = crypto.createHash('sha512').update(px.toString('hex')).digest()
    //
    //     // define the initiation vector
    //     const iv = op.iv || crypto.randomBytes(16)
    //     const encryptionKey = hash.slice(0, 32)
    //     const macKey = hash.slice(32)
    //
    //     const ciphertext = WcSdk.aes256CbcEncrypt(iv, encryptionKey, payload)
    //
    //     const dataToMac = Buffer.concat([iv, Buffer.from(ephemPublicKey, 'hex'), ciphertext])
    //
    //     const hmacSha = crypto.createHmac('sha256', macKey).update(dataToMac).digest()
    //     const mac = Buffer.from(hmacSha)
    //
    //     return {
    //         iv: iv.toString('hex'),
    //         ephemPublicKey,
    //         ciphertext: ciphertext.toString('hex'),
    //         mac: mac.toString('hex'),
    //     }
    // }
    //
    // static aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer) {
    //     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    //     const firstChunk = cipher.update(plaintext)
    //     const secondChunk = cipher.final()
    //     return Buffer.concat([firstChunk, secondChunk])
    // }
}