import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";

import {
  useAccount,
  ConnectButton,
  useConnectModal,
  Web3Button,
} from "@web3modal/react";
import Image from "next/image";

const FooterBase: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  return (
    <Flex
      flexDir="row"
      justifyContent="center"
      alignItems={"center"}
      height="10vh"
      width="90%"
      borderRadius="15px"
      p={5}
      position="fixed"
      bottom={0}
    >
      <span className="font-sniglet">made with ❤️ at ETHLisbon 🇵🇹</span>
    </Flex>
  );
};

export default FooterBase;
