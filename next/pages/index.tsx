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
import { useCallback } from "react";
import axios from "axios";

import Header from "../components/header";
import Journey from "../components/journey";

import { useAccount, useConnectModal, Web3Button } from "@web3modal/react";

const Home: NextPage = () => {
	const { isOpen, open, close } = useConnectModal();
	const { account } = useAccount();

	const handleOnClick = useCallback(() => {
		// Fetch Credit Score details
	}, []);

	return (
		<Flex
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			width="100%"
			backgroundColor="white"
		>
			<Header />
			<Journey />
			<VStack flexDir="column" spacing="4" mb="4">
				<Heading>Enter your address here</Heading>
				<Input placeholder="Enter wallet address" size="md" />
			</VStack>
			<Button onClick={handleOnClick}>Submit details</Button>
		</Flex>
	);
};

export default Home;
