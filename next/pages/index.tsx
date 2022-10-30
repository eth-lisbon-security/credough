import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import axios from "axios";

import Header from "../components/header";
import Journey from "../components/journey";
import Bounties from "../components/Bounties";
import Footer from "../components/Footer";

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
			height="100%"
			width="100%"
			backgroundColor="white"
		>
			<Header />
			<Journey />
			<Bounties />
			<Footer />
		</Flex>
	);
};

export default Home;
