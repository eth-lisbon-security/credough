import type { NextPage } from "next";
import { Button, Flex, Heading } from "@chakra-ui/react";

import Image from "next/image";
import { useRouter } from "next/router";
import HeaderBase from "../components/HeaderBase";
import FooterBase from "../components/FooterBase";
import TabbedContainer from "../components/TabbedContainer";

const Flow: NextPage = () => {
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
        height="60vh"
        width="80%"
        background={"white"}
        rounded={"2xl"}
        className={"shadow-lg"}
      >
        <TabbedContainer />
      </Flex>
      <FooterBase />
    </Flex>
  );
};

export default Flow;
