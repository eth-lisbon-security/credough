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

const Header: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  const router = useRouter();

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      //height="5vh"
      width="90%"
      backgroundColor="#38B5DCA1"
      borderRadius="15px"
      p={5}
    >
      <Flex>
        <Image src={"/images/o_donut.png"} width={40} height={40}></Image>
        <Heading color="white" fontFamily={"Sniglet"} pl={3}>
          Credough
        </Heading>
      </Flex>
      <Flex>
        <Button
          className="bg-white rounded-xl"
          onClick={() => router.push("/dashboard")}
        >
          🍩 Get started
        </Button>
        {!account.isConnected ? <ConnectButton /> : <Web3Button />}
      </Flex>
    </Flex>
  );
};

export default Header;
