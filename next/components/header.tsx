import type { NextPage } from "next";
import {
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  useAccount,
  ConnectButton,
  useConnectModal,
  Web3Button,
} from "@web3modal/react";
import Image from "next/image";

import { Sniglet } from "@next/font/google";

const sniglet = Sniglet({ weight: "400" });

const Header: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  return (
    <Flex
      flexDir="row"
      justifyContent="flex-start"
      //height="5vh"
      width="90%"
      backgroundColor="#38B5DCA1"
      borderRadius="15px"
      p={5}
    >
      <Image src={"/images/o_donut.png"} width={40} height={40}></Image>
      <Heading className={sniglet.className} color="white">
        Credough
      </Heading>
      {!account.isConnected ? <ConnectButton /> : <Web3Button />}
    </Flex>
  );
};

export default Header;
