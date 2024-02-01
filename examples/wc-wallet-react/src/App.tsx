import * as React from 'react'
import DefaultCard from './components/DefaultCard'
import RequestCard from './components/RequestCard'
import ProposalCard from './components/ProposalCard'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { CloseButton, Flex } from '@chakra-ui/react'
import Header from './components/Header'
import { useAccountContext } from './context/AccountContext'
import AccountEntry from './components/AccountEntry'
import { useEffect, useState } from 'react'
import ConnectDapp from './components/ConnectDapp'
import { WalletConnectNeonAdapter } from './helpers/WalletConnectNeonAdapter'
import { TSessionAndTRequest } from './types'

export default function App(): any {
  const walletConnectCtx = useWalletConnectWallet()
  const accountCtx = useAccountContext()
  const [connectingApp, setConnectingApp] = useState(false)
  const [requestOpen, setRequestOpen] = useState<TSessionAndTRequest | undefined>(undefined)

  useEffect(() => {
    setConnectingApp(!walletConnectCtx.sessions.length)
  }, [walletConnectCtx.sessions])

  useEffect(() => {
    walletConnectCtx.setAdapters({
      neo3: new WalletConnectNeonAdapter(accountCtx.rpcAddress, accountCtx.account),
    })
  }, [accountCtx.rpcAddress, accountCtx.account])

  return (
    <Flex direction="column" w="100vw" minH="100vh" bgImage="url(/bg.png)" color="white">
      <Header />
      {!accountCtx.account || !accountCtx.accountDecripted ? (
        <AccountEntry flex={1} />
      ) : walletConnectCtx.proposals.length ? (
        <ProposalCard flex={1} />
      ) : requestOpen ? (
        <RequestCard sessionAndRequest={requestOpen} closeRequest={() => setRequestOpen(undefined)} flex={1} />
      ) : connectingApp ? (
        <Flex flex={1}>
          <ConnectDapp flex={1} />
          {!!walletConnectCtx.sessions.length && <CloseButton onClick={() => setConnectingApp(false)} />}
        </Flex>
      ) : (
        <DefaultCard openRequest={(e) => setRequestOpen(e)} openConnectingDapp={() => setConnectingApp(true)} />
      )}
    </Flex>
  )
}
