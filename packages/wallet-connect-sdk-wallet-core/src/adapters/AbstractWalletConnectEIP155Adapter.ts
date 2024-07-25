import { TypedDataSigner } from '@ethersproject/abstract-signer'
import { TAdapterMethodParam } from '../types'
import { ethers } from 'ethers'

export type TCustomSigner = ethers.Signer & TypedDataSigner

/* Some methods are named in snakecase, as Ethereum methods are in snakecase and the SDK does not make any transformer for the method called by the dapp. */
export abstract class AbstractWalletConnectEIP155Adapter {
  protected async getServices(args: TAdapterMethodParam) {
    const rpcAddress = await this.getRPCUrl(args)
    const provider = new ethers.providers.JsonRpcProvider(rpcAddress)
    let wallet: TCustomSigner

    const customSigner = await this.getCustomSigner(args)
    if (customSigner) {
      wallet = customSigner
    } else {
      const accountString = await this.getAccountString(args)
      wallet = new ethers.Wallet(accountString)
    }

    return {
      wallet,
      provider,
    }
  }

  protected resolveParams(param: any) {
    if (typeof param !== 'object') {
      throw new Error('Invalid Params')
    }

    if (param.gas) {
      param.gasLimit = param.gas
      delete param.gas
    }

    return param
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
    const param = this.resolveParams(args.request.params.request.params[0])
    const { wallet } = await this.getServices(args)
    const signature = await wallet.signTransaction(param)
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
    const param = this.resolveParams(args.request.params.request.params[0])

    const { wallet, provider } = await this.getServices(args)
    const connectedWallet = wallet.connect(provider)

    const { hash } = await connectedWallet.sendTransaction(param)
    return hash
  }

  async eth_call(args: TAdapterMethodParam): Promise<string> {
    const param = this.resolveParams(args.request.params.request.params[0])

    const { wallet, provider } = await this.getServices(args)
    const connectedWallet = wallet.connect(provider)

    return await connectedWallet.call(param)
  }

  async eth_requestAccounts(args: TAdapterMethodParam): Promise<string[]> {
    const { wallet } = await this.getServices(args)
    return [await wallet.getAddress()]
  }

  async eth_sendRawTransaction(args: TAdapterMethodParam): Promise<string> {
    const { provider } = await this.getServices(args)

    const { hash } = await provider.sendTransaction(args.request.params.request.params[0])

    return hash
  }

  // TODO: It'll be implemented in this issue: #86du71hh4 WC - Ghostmarket via WC asks for wallet methods we don't support
  wallet_switchEthereumChain(): Promise<boolean> {
    throw new Error('It is impossible to switch the Ethereum chain')
  }

  wallet_getPermissions(): Promise<string[]> {
    throw new Error('It is impossible to get the permissions')
  }

  wallet_requestPermissions(): Promise<string[]> {
    throw new Error('It is impossible to request the permissions')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCustomSigner(args: TAdapterMethodParam): Promise<TCustomSigner | undefined> {
    return undefined
  }

  abstract getAccountString(args: TAdapterMethodParam): Promise<string>

  abstract getRPCUrl(args: TAdapterMethodParam): Promise<string>
}
