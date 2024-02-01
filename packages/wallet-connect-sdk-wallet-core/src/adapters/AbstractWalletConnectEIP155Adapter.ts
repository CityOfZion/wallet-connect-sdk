import { TAdapterMethodParam } from '../types'
import { ethers } from 'ethers'

/* Some methods are named in snakecase, as Ethereum methods are in snakecase and the SDK does not make any transformer for the method called by the dapp. */
export abstract class AbstractWalletConnectEIP155Adapter {
  protected async getServices(args: TAdapterMethodParam) {
    const rpcAddress = await this.getRPCUrl(args)
    const accountString = await this.getAccountString(args)

    const provider = new ethers.providers.JsonRpcProvider(rpcAddress)
    const wallet = new ethers.Wallet(accountString)
    return {
      wallet,
      provider,
    }
  }

  protected convertHexToUtf8(value: string) {
    if (ethers.utils.isHexString(value)) {
      return ethers.utils.toUtf8String(value)
    }

    return value
  }

  async personal_sign(args: TAdapterMethodParam): Promise<string> {
    const { wallet } = await this.getServices(args)

    const message = args.request.params.request.params.filter((param) => !ethers.utils.isAddress(param))[0]
    const convertedMessage = this.convertHexToUtf8(message)

    const signedMessage = await wallet.signMessage(convertedMessage)
    return signedMessage
  }

  eth_sign(args: TAdapterMethodParam): Promise<string> {
    return this.personal_sign(args)
  }

  async eth_signTransaction(args: TAdapterMethodParam): Promise<string> {
    const { wallet } = await this.getServices(args)
    const signature = await wallet.signTransaction(args.request.params.request.params[0])
    return signature
  }

  async eth_signTypedData(args: TAdapterMethodParam): Promise<string> {
    const { wallet } = await this.getServices(args)

    const data = args.request.params.request.params.filter((param) => !ethers.utils.isAddress(param))[0]
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data

    const { domain, types, message } = parsedData
    // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471
    delete types.EIP712Domain
    const signedData = await wallet._signTypedData(domain, types, message)
    return signedData
  }

  eth_signTypedData_v3(args: TAdapterMethodParam): Promise<string> {
    return this.eth_signTypedData(args)
  }

  eth_signTypedData_v4(args: TAdapterMethodParam): Promise<string> {
    return this.eth_signTypedData(args)
  }

  async eth_sendTransaction(args: TAdapterMethodParam): Promise<string> {
    const { wallet, provider } = await this.getServices(args)
    const connectedWallet = wallet.connect(provider)

    const { hash } = await connectedWallet.sendTransaction(args.request.params.request.params[0])
    return hash
  }

  abstract getAccountString(args: TAdapterMethodParam): Promise<string>

  abstract getRPCUrl(args: TAdapterMethodParam): Promise<string>
}
