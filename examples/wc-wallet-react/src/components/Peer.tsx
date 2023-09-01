import * as React from "react";
import {SignClientTypes} from "@walletconnect/types";
import {Flex, Image, Text, Link, Spacer, DividerProps} from "@chakra-ui/react";

export default function Peer(props: { metadata: SignClientTypes.Metadata } & DividerProps): any {
  return (
    <Flex h="5rem" {...props}>
      <Image w="5rem" src={props.metadata.icons[0]} alt={props.metadata.name} />
      <Flex direction="column" ml="1rem" h="100%">
        <Text fontSize="1.5rem">{props.metadata.name}</Text>
        <Text fontSize="0.875rem" color="#888888" overflowY="hidden">{props.metadata.description}</Text>
        <Spacer/>
        <Link href={props.metadata.url} target="_blank" fontSize="0.875rem" color="#888888">{props.metadata.url}</Link>
      </Flex>
    </Flex>
  )
}
