import { Flex, Heading, Image } from "@chakra-ui/react";

const Bounties = () => {
  return (
    <Flex flexDir="column" alignItems="center" p={5}>
      <Heading>built with</Heading>
      <Flex
        flexDir={["column", null, "row"]}
        alignItems="center"
        gap="24px"
        pt={5}
      >
        <Image src="/images/sommelier.png" alt="Sommelier" />
        <Image src="/images/ipfs.png" alt="IPFS" width="100px" height="40px" />
        <Image
          src="/images/wallet-connect.png"
          alt="Wallet Connect"
          height="35px"
          width="200px"
        />
        <Image
          src="/images/cronos.png"
          alt="Cronos"
          height="35px"
          width="120px"
        />
        <Image
          src="/images/compound.png"
          alt="Compound"
          width="200px"
          height="54px"
        />
      </Flex>
    </Flex>
  );
};

export default Bounties;
