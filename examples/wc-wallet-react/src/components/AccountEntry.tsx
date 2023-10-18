import * as React from 'react'
import {
  Box,
  Button,
  DividerProps,
  Flex,
  Image,
  Input,
  Select,
  Spacer,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import { FileHelper } from '../helpers/FileHelper'
import { useCallback, useEffect, useState } from 'react'
import { wallet } from '@cityofzion/neon-core'
import { useAccountContext } from '../context/AccountContext'
import { DEFAULT_NETWORKS } from '../constants'

export default function AccountEntry(props: DividerProps): any {
  const accountCtx = useAccountContext()
  const toast = useToast()
  const [choseNetwork, setChoseNetwork] = useState(false)
  const [creatingNew, setCreatingNew] = useState(false)
  const [loading, setLoading] = useState(false)

  const setAccount = (acc: wallet.Account) => {
    accountCtx.setAccount(acc)
  }

  const loadAccountFromStorage = useCallback(async () => {
    if (!accountCtx.account) {
      const str = localStorage.getItem('account')
      const json = str ? (JSON.parse(str) as Partial<wallet.AccountJSON>) : null

      if (json) {
        const account = new wallet.Account(json)
        setAccount(account)
      }
    }
  }, [accountCtx])

  useEffect(() => {
    loadAccountFromStorage()
  }, [loadAccountFromStorage])

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    await passwordOnAccount()
    setLoading(false)
  }

  const passwordOnAccount = async () => {
    if (accountCtx.account && accountCtx.accountPassword) {
      if (!creatingNew) {
        try {
          await accountCtx.account.decrypt(accountCtx.accountPassword)
        } catch (e: any) {
          toast({
            title: e.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          return
        }
      }
      accountCtx.setAccountDecripted(true)

      try {
        await accountCtx.account.encrypt(accountCtx.accountPassword)
      } catch (e) {
        console.log('error encrypting account')
      }
      await localStorage.setItem('account', JSON.stringify(accountCtx.account.export()))
    }
  }

  const importAccount = async () => {
    const file = await FileHelper.promptForSingleFile('json')
    const json = await file?.text()
    if (json) {
      const acc = JSON.parse(json)
      const account = new wallet.Account(acc)
      setAccount(account)
      setCreatingNew(false)
    }
  }

  const createAccount = async () => {
    const account = new wallet.Account()
    setAccount(account)
    setCreatingNew(true)
  }

  return (
    <Flex direction="column" align="center" {...props}>
      <Spacer />
      {loading ? (
        <>
          <Spinner alignSelf="center" />
          Decrypting 😒
        </>
      ) : !choseNetwork ? (
        <>
          <Text fontSize="0.875rem" color="#888888">
            Choose your network
          </Text>
          <Text fontSize="0.75rem" mt="1.5rem" w="20rem">
            Network Type
          </Text>
          <Select
            onChange={(e: any) => accountCtx.setNetworkType(e.target.value)}
            value={accountCtx.networkType}
            borderColor="#373d4a"
            borderRadius={0}
            bg="#1a202b"
            mt="0.5rem"
            w="20rem"
            color="#999999"
          >
            {Object.keys(DEFAULT_NETWORKS).map((key) => (
              <option value={key} key={key}>
                {DEFAULT_NETWORKS[key].name}
              </option>
            ))}
          </Select>
          {accountCtx.networkType === 'private' && (
            <>
              <Text fontSize="0.75rem" mt="1.5rem" w="20rem">
                RPC Address
              </Text>
              <Input
                onChange={(e: any) => accountCtx.setPrivateRpcAddress(e.target.value)}
                value={accountCtx.privateRpcAddress}
                borderColor="#373d4a"
                borderRadius={0}
                bg="#1a202b"
                _placeholder={{ color: '#373d4a' }}
                mt="0.5rem"
                w="20rem"
              />
            </>
          )}
          <Button
            data-testid="account-entry__continue"
            onClick={() => setChoseNetwork(true)}
            h="2.75rem"
            mt="1.5rem"
            bg="#373d4a"
            borderRadius={0}
            _hover={{ bg: 'black' }}
          >
            Continue
          </Button>
        </>
      ) : !accountCtx.account ? (
        <>
          <Text fontSize="0.875rem" color="#888888">
            Do you have an Account JSON File?
          </Text>
          <Flex h="2.75rem" mt="1.5rem">
            <Button onClick={importAccount} h="100%" bg="#373d4a" borderRadius={0} _hover={{ bg: 'black' }}>
              Yes! Import File
            </Button>
            <Button
              data-testid="account-entry__create-new-account"
              onClick={createAccount}
              h="100%"
              bg="#373d4a"
              borderRadius={0}
              _hover={{ bg: 'black' }}
              ml="0.5rem"
            >
              No, Generate a new one
            </Button>
          </Flex>
        </>
      ) : (
        <Flex>
          <Flex as="form" onSubmit={login} direction="column" align="center">
            <Text fontSize="0.875rem" color="#888888" fontWeight="bold">
              {!creatingNew ? `Login with this Account` : `Create Account`}
            </Text>
            <Flex align="center" mt="0.8rem">
              <Image w="1.875rem" src="https://cryptologos.cc/logos/neo-neo-logo.svg" />
              <Text data-testid="account-entry__account-address" fontSize="0.875rem" ml="0.5rem">
                {accountCtx.account.address}
              </Text>
            </Flex>
            <Input
              type={`password`}
              onChange={(e: any) => accountCtx.setAccountPassword(e.target.value)}
              borderColor="#373d4a"
              borderRadius={0}
              bg="#1a202b"
              _placeholder={{ color: '#373d4a' }}
              mt="1rem"
              data-testid="account-entry__password-input"
              placeholder={!creatingNew ? `Type your password` : `Type a new password`}
            />
            <Button
              type="submit"
              w="6.5rem"
              h="2.75rem"
              bg="#373d4a"
              borderRadius={0}
              mt="1rem"
              data-testid="account-entry__login-or-create"
              _hover={{ bg: 'black' }}
            >
              {!creatingNew ? `Login` : `Create`}
            </Button>
          </Flex>
          <Flex direction="column" align="center" ml="2rem">
            <Box flex={1} w="1px" bg="#888888" />
            <Text fontSize="0.875rem" color="#888888" my="0.5rem">
              Or
            </Text>
            <Box flex={1} w="1px" bg="#888888" />
          </Flex>
          <Flex direction="column" w="12rem" alignSelf="center" ml="2rem">
            <Button onClick={importAccount} w="100%" h="2.75rem" bg="#373d4a" borderRadius={0} _hover={{ bg: 'black' }}>
              {!creatingNew ? `Import another Account` : `Import an Account`}
            </Button>
            {!creatingNew && (
              <Button
                onClick={createAccount}
                w="100%"
                h="2.75rem"
                bg="#373d4a"
                borderRadius={0}
                _hover={{ bg: 'black' }}
                mt="0.5rem"
              >
                Generate a new Account
              </Button>
            )}
          </Flex>
        </Flex>
      )}
      <Spacer />
    </Flex>
  )
}
