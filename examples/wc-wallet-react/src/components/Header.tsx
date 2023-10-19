import * as React from 'react'
import { Flex, Image, Link, Text } from '@chakra-ui/react'
import LogoutIcon from './icon/LogoutIcon'
import { FileHelper } from '../helpers/FileHelper'
import { useAccountContext } from '../context/AccountContext'
import { useCallback, useEffect, useState } from 'react'
import { NeonInvoker, NeonParser } from '@cityofzion/neon-dappkit'

const chainMeta = {
  name: 'Neo3',
  logo: 'https://cryptologos.cc/logos/neo-neo-logo.svg',
}

export default function Header(): any {
  const accountCtx = useAccountContext()
  const [balance, setBalance] = useState<number>()

  const logout = async () => {
    accountCtx.setAccountPassword(undefined)
    accountCtx.setAccountDecripted(false)
  }

  const ellipseAddress = (address = '', width = 10) => {
    return `${address.slice(0, width)}...${address.slice(-width)}`
  }

  const exportAccount = async () => {
    const json = accountCtx.account?.export()
    FileHelper.downloadJsonFile(accountCtx.account?.address ?? '', json)
  }

  const isLoggedIn = () => {
    return accountCtx.account && accountCtx.accountDecripted
  }

  const loadBalance = useCallback(async () => {
    if (!accountCtx.account) {
      return undefined
    }

    const invoker = await NeonInvoker.init({
      rpcAddress: accountCtx.rpcAddress,
    })

    const response = await invoker.testInvoke({
      invocations: [
        {
          operation: 'balanceOf',
          scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
          args: [{ value: accountCtx.account.address, type: 'Hash160' }],
        },
      ],
    })

    const gas = NeonParser.parseRpcResponse(response.stack[0]) / Math.pow(10, 8)

    setBalance(gas)
  }, [accountCtx.account, accountCtx.networkType, accountCtx.privateRpcAddress])

  useEffect(() => {
    loadBalance()
  }, [loadBalance])

  return (
    <Flex
      align="center"
      bgColor="#00000033"
      borderBottom="1px"
      borderColor="#ffffff33"
      h={['3.5rem', '6rem']}
      px={['1rem', '3rem']}
    >
      <Flex direction="column" flex={1} align={'start'}>
        <Text fontSize="2.25rem" fontWeight="bold">
          Web Wallet
        </Text>
        <Text fontSize="0.875rem" color="#888888" textTransform="uppercase" mt="-0.5rem">
          For Tests
        </Text>
      </Flex>
      {isLoggedIn() && (
        <Flex direction="column" align="right">
          {accountCtx.account && (
            <Flex key={accountCtx.account.address} align="center">
              <Image src={chainMeta.logo} alt={chainMeta.name} title={chainMeta.name} w="1.6rem" mr="0.5rem" />
              <Flex direction="column">
                <Text data-testid="header__ellipse-address" fontSize="0.875rem">
                  {ellipseAddress(accountCtx.account.address, 8)}
                </Text>
                <Text fontSize="0.6rem">GAS: {balance}</Text>
                <Link fontSize="0.875rem" mt="-0.3rem" color="#888888" onClick={exportAccount}>
                  Download JSON File
                </Link>
              </Flex>
              <Link ml="0.6rem" onClick={logout}>
                <LogoutIcon boxSize="1.4rem" color="#888888" />
              </Link>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}
