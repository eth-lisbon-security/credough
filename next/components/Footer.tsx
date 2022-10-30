import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";

import {
  useAccount,
  ConnectButton,
  useConnectModal,
  Web3Button,
} from "@web3modal/react";
import Image from "next/image";

const Footer: NextPage = () => {
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
    ></Flex>
  );
};

export default Footer;
