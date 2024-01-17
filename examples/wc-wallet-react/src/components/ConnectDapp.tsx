import * as React from 'react'
import { Box, Button, DividerProps, Flex, Input, Spacer, Spinner, Text, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Scanner, { ScannerValidation } from './Scanner'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'

export default function ConnectDapp(props: DividerProps): any {
  const walletConnectCtx = useWalletConnectWallet()
  const toast = useToast()
  const [scanner, setScanner] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const handleScan = () => {
    setLoading(true)
    setScanner(true)
  }

  const handleInput = async (event) => {
    setLoading(true)
    try {
      await walletConnectCtx.connect(event.target.value.trim())
    } catch (e) {
      setLoading(false)
      toast({
        title: 'Invalid input',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const onScannerValidate = (data: string) => {
    const res: ScannerValidation = { error: null, result: null }
    try {
      res.result = data
    } catch (error: any) {
      res.error = error
    }

    return res
  }

  const onScannerScan = async (data: any) => {
    await walletConnectCtx.connect(data)
    setScanner(false)
  }

  const onScannerError = (error: Error) => {
    setLoading(false)
    toast({
      title: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  const closeScanner = () => {
    setScanner(false)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(false)
  }, [walletConnectCtx.proposals.length])

  const handleUnhandledRejection = useCallback(
    (event: PromiseRejectionEvent) => {
      if (event.reason.message && event.reason.message.includes('No matching pairing')) {
        setLoading(false)
        toast({
          title: 'Expired code',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        event.preventDefault()
      }
    },
    [toast],
  )

  useEffect(() => {
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [handleUnhandledRejection])

  return (
    <Flex direction="column" align="center" {...props}>
      <Spacer />
      {loading ? (
        <Spinner mt="2rem" />
      ) : (
        <>
          <Text fontSize="0.875rem" fontWeight="bold" color="#888888">
            Connect with an App
          </Text>
          <Button h="2.75rem" bg="#373d4a" borderRadius={0} mt="1.5rem" _hover={{ bg: 'black' }} onClick={handleScan}>
            Scan the QRCode
          </Button>
          <Flex align="center" mt="2rem" maxW="10rem" w="100%">
            <Box flex={1} h="1px" bg="#888888" />
            <Text fontSize="0.875rem" color="#888888" mx="0.5rem">
              Or
            </Text>
            <Box flex={1} h="1px" bg="#888888" />
          </Flex>
          <Input
            onChange={handleInput}
            borderColor="#373d4a"
            borderRadius={0}
            data-testid="connect-dapp__dapp-uri-input"
            maxW="20rem"
            bg="#1a202b"
            _placeholder={{ color: '#373d4a' }}
            mt="2rem"
            placeholder="Paste the Code "
          />
        </>
      )}
      <Spacer />
      {scanner && (
        <Scanner
          onValidate={onScannerValidate}
          onScan={onScannerScan}
          onError={onScannerError}
          onClose={closeScanner}
        />
      )}
    </Flex>
  )
}
