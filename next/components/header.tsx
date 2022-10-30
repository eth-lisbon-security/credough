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

const Header: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      height="5vh"
      width="90%"
      backgroundColor="#38B5DCA1"
      borderRadius="15px"
    >
      {!account.isConnected ? <ConnectButton /> : <Web3Button />}
    </Flex>
  );
};

export default Header;
