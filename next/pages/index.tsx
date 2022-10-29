import type { NextPage } from "next";
import { Flex, Heading, Input, VStack, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import axios from "axios";

const Home: NextPage = () => {
	const handleOnClick = useCallback(() => {
		// Fetch Credit Score details
	}, []);

	return (
		<Flex
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			backgroundColor="black"
		>
			<VStack flexDir="column" spacing="4" mb="4">
				<Heading>Enter your address here</Heading>
				<Input placeholder="Enter wallet address" size="md" />
			</VStack>
			<Button onClick={handleOnClick}>Submit details</Button>
		</Flex>
	);
};

export default Home;
