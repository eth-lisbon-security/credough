import type { NextPage } from "next";
import { Button, Flex, Heading } from "@chakra-ui/react";

import {
  useAccount,
  ConnectButton,
  useConnectModal,
  Web3Button,
} from "@web3modal/react";
import Image from "next/image";
import { useRouter } from "next/router";
import HeaderBase from "../components/HeaderBase";
import FooterBase from "../components/FooterBase";

const Flow: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  const router = useRouter();

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      height="100vh"
      width="100%"
      className="bg-gradient-to-r from-[#eaf2ff] to-[#d4e4ff]"
    >
      <HeaderBase />
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent={"center"}
        justifyItems={"center"}
        height="60vh"
        width="80%"
        background={"white"}
        rounded={"2xl"}
      >
        {account.isConnected ? <ConnectButton /> : <Web3Button />}
      </Flex>
      <FooterBase />
    </Flex>
  );
};

export default Flow;
