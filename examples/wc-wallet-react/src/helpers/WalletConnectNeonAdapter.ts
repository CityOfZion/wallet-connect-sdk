import { AbstractWalletConnectNeonAdapter, WalletInfo } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Account } from '@cityofzion/neon-core/lib/wallet'

export class WalletConnectNeonAdapter extends AbstractWalletConnectNeonAdapter {
  constructor(
    public rpcAddress: string | undefined = undefined,
    public account: Account | undefined = undefined,
  ) {
    super()
  }

  async getAccountString(): Promise<string> {
    return this.account?.WIF ?? ''
  }

  async getRPCUrl(): Promise<string> {
    return this.rpcAddress ?? 'https://testnet2.neo.coz.io:443'
  }

  async getWalletInfo(): Promise<WalletInfo> {
    return { isLedger: false }
  }
}
