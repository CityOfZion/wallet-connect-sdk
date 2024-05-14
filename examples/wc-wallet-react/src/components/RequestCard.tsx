import * as React from 'react'

import Peer from '../components/Peer'
import { Button, Spinner, DividerProps, Flex, Image, Spacer, Text, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TSessionAndTRequest } from '../types'

export default function RequestCard(
  props: DividerProps & { sessionAndRequest: TSessionAndTRequest; closeRequest: () => void },
): any {
  const walletConnectCtx = useWalletConnectWallet()
  const [sendingResponse, setSendingResponse] = useState(false)

  const request = props.sessionAndRequest.request.params.request

  const approve = async () => {
    setSendingResponse(true)
    try {
      await walletConnectCtx.approveRequest(props.sessionAndRequest.request)
    } finally {
      setSendingResponse(false)
      props.closeRequest()
    }
  }

  const reject = async () => {
    setSendingResponse(true)
    await walletConnectCtx.rejectRequest(props.sessionAndRequest.request)
    setSendingResponse(false)
    props.closeRequest()
  }

  const contextualMessage = String(request.params.contextualMessage).trim()

  const items = Array.isArray(request.params)
    ? request.params
    : request.params.invocations
    ? request.params.invocations
    : [request.params]

  return (
    <Flex direction="column" align="center" {...props}>
      <Spacer />
      <Flex direction="column" bg="#252b36" w="23rem" boxShadow="dark-lg" p="0.5rem">
        {props.sessionAndRequest.session.peer && <Peer metadata={props.sessionAndRequest.session.peer.metadata} />}
        <Flex
          direction="column"
          bg="#00000022"
          boxShadow="inset 0 2px 3px 0 #00000033"
          mt="0.9rem"
          p="0.7rem"
          overflow="hidden"
        >
          <Text fontSize="0.875rem" color="#888888" fontWeight="bold">
            Chains
          </Text>
          <Flex align="center" mt="0.5rem">
            <Image w="1.875rem" src="https://cryptologos.cc/logos/neo-neo-logo.svg" />
            <Text fontSize="0.875rem" ml="0.5rem">
              Neo3
            </Text>
          </Flex>
          <Text fontSize="0.875rem" color="#888888" fontWeight="bold" mt="0.875rem">
            Method Contextual Message
          </Text>
          <Text fontSize="0.875rem" mt="0.5rem" data-testid="request-card__contextual-message">
            {contextualMessage}
          </Text>
          <Text fontSize="0.875rem" color="#888888" fontWeight="bold" mt="0.875rem">
            Method
          </Text>
          <Text fontSize="0.875rem" mt="0.5rem">
            {request.method}
          </Text>
          <Text fontSize="0.875rem" color="#888888" fontWeight="bold" mt="0.875rem">
            Arguments
          </Text>
          {items?.map((p: any, i: number) => (
            <Box key={i}>
              <Flex mt="0.5rem">
                <Box h="1.75rem" pt="0.08rem" px={'0.6rem'} textAlign="center" bg="#373d4a" borderRadius="0.875rem">
                  {i.toString(10)}
                </Box>
                <Text ml="0.5rem">{typeof p === 'object' ? '' : typeof p === 'number' ? p + 1 : p.toString()}</Text>
              </Flex>
              {typeof p === 'object' && (
                <Flex direction="column" borderLeft="solid 1px #373d4a" ml="0.875rem" pl="0.875rem">
                  {Object.keys(p).map((k: string) => (
                    <Flex key={k} mt="0.5rem">
                      <Box
                        h="1.75rem"
                        pt="0.08rem"
                        px={'0.6rem'}
                        textAlign="center"
                        bg="#373d4a"
                        borderRadius="0.875rem"
                      >
                        {k}
                      </Box>
                      <Text
                        ml="0.5rem"
                        title={p[k] && (typeof p[k] !== 'object' ? p[k].toString() : JSON.stringify(p[k]))}
                      >
                        {p[k] && (typeof p[k] !== 'object' ? p[k].toString() : JSON.stringify(p[k]))}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Box>
          ))}
        </Flex>
        {sendingResponse ? (
          <Spinner alignSelf="center" />
        ) : (
          <Flex mt="0.75rem" position="sticky" bottom={0}>
            <Button
              flex={1}
              onClick={approve}
              data-testid="request-card__approve"
              bg="black"
              borderRadius={0}
              _hover={{ bg: '#111' }}
            >
              Approve
            </Button>
            <Button
              flex={1}
              onClick={reject}
              data-testid="request-card__reject"
              bg="black"
              borderRadius={0}
              _hover={{ bg: '#111' }}
              ml="0.5rem"
            >
              Reject
            </Button>
          </Flex>
        )}
      </Flex>
      <Spacer />
    </Flex>
  )
}
