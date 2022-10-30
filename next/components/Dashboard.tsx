import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import CreditScoreCard from "./CreditScore";
import { useRouter } from "next/router";
import { useAccount } from "@web3modal/react";

const Dashboard = () => {
	const {
		account: { isConnected },
	} = useAccount();

	if (!isConnected) {
		return (
			<Flex width="100%" h="100vh" justifyContent="center" alignItems="center">
				<Text>
					You are not connected to a wallet. Please connect to a wallet to view
					your dashboard.
				</Text>
			</Flex>
		);
	}

	return <Flex width="100%" h="100vh"></Flex>;
};

export default Dashboard;
