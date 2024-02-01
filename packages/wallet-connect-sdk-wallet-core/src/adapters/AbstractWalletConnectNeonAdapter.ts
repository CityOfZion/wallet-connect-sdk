import { NeonInvoker, NeonSigner, NeonParser } from '@cityofzion/neon-dappkit'
import * as NeonCore from '@cityofzion/neon-core'
import * as NeonJs from '@cityofzion/neon-js'
import { TAdapterMethodParam } from '../types'
import {
  InvokeResult,
  SignedMessage,
  RpcResponseStackItem,
  WalletInfo,
  NetworkVersion,
  ContractInvocationMulti,
  EncryptedPayload,
  DecryptFromArrayResult,
  CalculateFee,
  BuiltTransaction,
  ContractInvocation,
} from '@cityofzion/wallet-connect-sdk-core'

export abstract class AbstractWalletConnectNeonAdapter {
  protected async getServices(args: TAdapterMethodParam) {
    const rpcAddress = await this.getRPCUrl(args)
    const accountString = await this.getAccountString(args)
    const account = new NeonCore.wallet.Account(accountString)
    const signingCallback = await this.getSigningCallback(args)

    const invoker = await NeonInvoker.init({
      rpcAddress,
      account,
      signingCallback,
    })
    const signer = new NeonSigner(account)
    const rpcClient = new NeonCore.rpc.RPCClient(rpcAddress)

    return {
      invoker,
      signer,
      rpcClient,
      rpcAddress,
      account,
    }
  }

  private convertDeprecatedInvocations(invocation: ContractInvocation) {
    const args = invocation.args?.map((arg) => {
      if (arg.type === 'ByteArray') {
        arg.value = NeonParser.base64ToHex(arg.value)
      }
      return arg
    })

    return {
      ...invocation,
      args,
    }
  }

  protected convertParams({ session, request }: TAdapterMethodParam) {
    const params = request.params.request.params as ContractInvocationMulti

    if (session.wccv && session.wccv < 3) {
      params.invocations = params.invocations.map(this.convertDeprecatedInvocations)
    }

    return params
  }

  async invokeFunction(args: TAdapterMethodParam): Promise<string> {
    const { invoker } = await this.getServices(args)
    const params = this.convertParams(args)
    return await invoker.invokeFunction(params)
  }

  async testInvoke(args: TAdapterMethodParam): Promise<InvokeResult> {
    const { invoker } = await this.getServices(args)
    const params = this.convertParams(args)
    return await invoker.testInvoke(params)
  }

  async signMessage(args: TAdapterMethodParam): Promise<SignedMessage> {
    const { signer } = await this.getServices(args)
    return await signer.signMessage(args.request.params.request.params)
  }

  async verifyMessage(args: TAdapterMethodParam): Promise<boolean> {
    const { signer } = await this.getServices(args)
    return await signer.verifyMessage(args.request.params.request.params)
  }

  async traverseIterator(args: TAdapterMethodParam): Promise<RpcResponseStackItem[]> {
    const { invoker } = await this.getServices(args)
    const params = args.request.params.request.params
    return await invoker.traverseIterator(params[0], params[1], params[2])
  }

  async decrypt(args: TAdapterMethodParam): Promise<string> {
    const { signer } = await this.getServices(args)
    const params = args.request.params.request.params
    return await signer.decrypt(params[0])
  }

  async encrypt(args: TAdapterMethodParam): Promise<EncryptedPayload[]> {
    const { signer } = await this.getServices(args)
    const params = args.request.params.request.params
    return await signer.encrypt(params[0], params[1])
  }

  async decryptFromArray(args: TAdapterMethodParam): Promise<DecryptFromArrayResult> {
    const { signer } = await this.getServices(args)
    const params = args.request.params.request.params
    return await signer.decryptFromArray(params[0])
  }

  async getNetworkVersion(args: TAdapterMethodParam): Promise<NetworkVersion> {
    const { rpcClient, rpcAddress } = await this.getServices(args)
    const response = await rpcClient.getVersion()
    return {
      rpcAddress,
      ...response,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSigningCallback(args: TAdapterMethodParam): Promise<NeonJs.api.SigningFunction | undefined> {
    return undefined
  }

  async calculateFee(args: TAdapterMethodParam): Promise<CalculateFee> {
    const { invoker } = await this.getServices(args)
    const params = this.convertParams(args)
    return await invoker.calculateFee(params)
  }

  async signTransaction(args: TAdapterMethodParam): Promise<BuiltTransaction> {
    const { invoker } = await this.getServices(args)
    const params = this.convertParams(args)
    return await invoker.signTransaction(params)
  }

  abstract getWalletInfo(args: TAdapterMethodParam): Promise<WalletInfo>

  abstract getAccountString(args: TAdapterMethodParam): Promise<string>

  abstract getRPCUrl(args: TAdapterMethodParam): Promise<string>
}
