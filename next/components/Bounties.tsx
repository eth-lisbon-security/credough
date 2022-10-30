import { Button, Flex, Heading, HStack, Image, Box } from "@chakra-ui/react";

const Bounties = () => {
	return (
		<Flex flexDir="row" alignItems="center">
			<Heading>built with</Heading>
			<Flex flexDir={["column", null, "row"]}>
				<Image src="/images/sommelier.png" alt="Sommelier" />
				<Image src="/images/ipfs.png" alt="IPFS" />
				<Image src="/images/wallet-connect.png" alt="Wallet Connect" />
				<Image src="/images/cronos.png" alt="Cronos" />
				<Image src="/images/compound.png" alt="Compound" />
				<Image src="/images/euler.png" alt="Euler" />
			</Flex>
		</Flex>
	);
};

export default Bounties;
