import React, { useContext, useMemo, useState } from 'react'
import { Account } from '@cityofzion/neon-core/lib/wallet'
import { DEFAULT_CHAIN, DEFAULT_NETWORKS } from '../constants'
import { Chain } from '@cityofzion/wallet-connect-sdk-wallet-react'

interface IAccountContext {
  accountPassword: string | undefined
  setAccountPassword: React.Dispatch<React.SetStateAction<string | undefined>>
  accountDecripted: boolean
  setAccountDecripted: React.Dispatch<React.SetStateAction<boolean>>
  privateRpcAddress: string
  setPrivateRpcAddress: React.Dispatch<React.SetStateAction<string>>
  networkType: Chain
  setNetworkType: React.Dispatch<React.SetStateAction<Chain>>
  account: Account | undefined
  setAccount: React.Dispatch<React.SetStateAction<Account | undefined>>
  rpcAddress: string
}

export const AccountContext = React.createContext({} as IAccountContext)

export const AccountContextProvider: React.FC = ({ children }) => {
  const [accountPassword, setAccountPassword] = useState<string | undefined>(undefined)
  const [accountDecripted, setAccountDecripted] = useState(false)
  const [networkType, setNetworkType] = useState(DEFAULT_CHAIN)
  const [privateRpcAddress, setPrivateRpcAddress] = useState<string>('http://localhost')
  const [account, setAccount] = useState<Account | undefined>()

  const rpcAddress = useMemo(() => {
    return DEFAULT_NETWORKS[networkType].url || privateRpcAddress
  }, [networkType, privateRpcAddress])

  const contextValue: IAccountContext = {
    accountPassword,
    setAccountPassword,
    accountDecripted,
    setAccountDecripted,
    networkType,
    setNetworkType,
    privateRpcAddress,
    setPrivateRpcAddress,
    account,
    setAccount,
    rpcAddress,
  }

  return <AccountContext.Provider value={contextValue}>{children}</AccountContext.Provider>
}

export const useAccountContext = (): IAccountContext => useContext(AccountContext)
