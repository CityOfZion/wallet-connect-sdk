import * as React from "react";
import {motion, MotionProps} from "framer-motion";

import {
  chakra,
  Button,
  ChakraProps,
  ComponentWithAs,
  DividerProps,
  Flex,
  forwardRef,
  Spacer,
  Text,
  Link,
} from "@chakra-ui/react";
import {useWalletConnectWallet} from "@cityofzion/wallet-connect-sdk-wallet-react";
import Peer from "../components/Peer";
import {DeleteIcon} from "@chakra-ui/icons";
import {TSessionAndTRequest} from "../types";

export type MotionBoxProps = Omit<ChakraProps,
  keyof MotionProps> &
  MotionProps & {
  as?: React.ElementType;
};

export const MotionLink = motion(
  forwardRef<ChakraProps, "a">((props, ref) => {
    return <chakra.a ref={ref} {...props} />;
  })
) as ComponentWithAs<"a", MotionBoxProps>;

export default function DefaultCard(props: DividerProps & {
  openConnectingDapp: () => any,
  openRequest: (request: TSessionAndTRequest) => any
}): any {
  const walletConnectCtx = useWalletConnectWallet()

  const {openConnectingDapp, openRequest, ...dividerProps} = props

  return (
    <Flex direction="column" align="center" {...dividerProps}>
      <Spacer/>
      <Button h="2.75rem" bg="#373d4a" borderRadius={0} mt="1.5rem"
              _hover={{bg: 'black'}} onClick={openConnectingDapp}>Make a new Connection</Button>
      <Spacer/>
      <Text fontSize="0.875rem" fontWeight="bold" color="#888888" mt="4rem">{"Sessions"}</Text>
      {walletConnectCtx.sessions.map(session => (
        <Flex key={`s${session.topic}`} direction="column" bg="#252b36" w="23rem" boxShadow="lg" p="0.5rem" my="0.5rem">
          <Flex>
            <Peer key={session.topic} metadata={session.peer.metadata} flex={1}/>
            <Link onClick={() => walletConnectCtx.disconnect(session)}><DeleteIcon color="#990000"/></Link>
          </Flex>
          {walletConnectCtx.requests.map(requestEvent => requestEvent.topic === session.topic && (
              <MotionLink
                key={`r${requestEvent.topic}`}
                bg="black" px="0.8rem" py="0.4rem" borderRadius="0.5rem" borderColor="#00000033" borderWidth="0.3rem"
                bgClip="padding-box" cursor="pointer"
                mx="0.5rem"
                mt="1rem"
                animate={{scale: [1, 1.07, 1]}}
                transition={{repeat: Infinity, repeatType: "loop",}}
                onClick={() => openRequest({request: requestEvent, session})}
              >
                <Text as="span" fontWeight="bold">Pending Request:</Text> {requestEvent.params.request.method}
              </MotionLink>
            )
          )}
        </Flex>
      ))}
      <Spacer/>
    </Flex>
  );
}
