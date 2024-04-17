import { Method, NetworkType } from '@cityofzion/wallet-connect-sdk-react'

export const networks: Record<NetworkType, { name: string }> = {
  'neo3:mainnet': {
    name: 'MainNet',
  },
  'neo3:testnet': {
    name: 'TestNet',
  },
  'neo3:private': {
    name: 'Private Network',
  },
}

export const dappMethods: Method[] = [
  'invokeFunction',
  'testInvoke',
  'signMessage',
  'verifyMessage',
  'traverseIterator',
  'getWalletInfo',
  'getNetworkVersion',
  'decrypt',
  'encrypt',
  'decryptFromArray',
  'calculateFee',
  'signTransaction',
  'wipeRequests',
]
