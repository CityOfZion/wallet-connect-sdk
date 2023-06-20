import { NeonSigner } from '@cityofzion/neon-signer'
import * as NeonCore from '@cityofzion/neon-core'
import * as NeonJs from '@cityofzion/neon-js'
import { NeonParser } from '@cityofzion/neon-parser'
import { TAdapterMethodParam } from './types'
import { NeonInvoker } from '@cityofzion/neon-invoker'
import {
  InvokeResult,
  SignedMessage,
  StackItemJson,
  WalletInfo,
  NetworkVersion,
} from '@cityofzion/wallet-connect-sdk-core'
import { ContractInvocationMulti } from '@cityofzion/wallet-connect-sdk-core'
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

  protected convertParams({ session, request }: TAdapterMethodParam) {
    const params = request.params.request.params as ContractInvocationMulti

    if (session.wccv >= 3) return params

    const invocations = params.invocations.map(invocation => {
      const args = invocation.args?.map(arg => {
        if (arg.type === 'ByteArray') {
          arg.value = NeonParser.base64ToHex(arg.value)
        }
        return arg
      })

      return {
        ...invocation,
        args,
      }
    })

    return {
      ...params,
      invocations,
    }
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

  async traverseIterator(args: TAdapterMethodParam): Promise<StackItemJson[]> {
    const { invoker } = await this.getServices(args)
    const params = args.request.params.request.params
    return await invoker.traverseIterator(params[0], params[1], params[2])
  }

  async getNetworkVersion(args: TAdapterMethodParam): Promise<NetworkVersion> {
    const { rpcClient, rpcAddress } = await this.getServices(args)
    const response = await rpcClient.getVersion()
    return {
      rpcAddress,
      ...response,
    }
  }

  async getSigningCallback(args: TAdapterMethodParam): Promise<NeonJs.api.SigningFunction | undefined> {
    return undefined
  }

  abstract getWalletInfo(args: TAdapterMethodParam): Promise<WalletInfo>

  abstract getAccountString(args: TAdapterMethodParam): Promise<string>

  abstract getRPCUrl(args: TAdapterMethodParam): Promise<string>
}
