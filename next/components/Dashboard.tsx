import React, { useEffect, useMemo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import CreditScoreCard from "./CreditScore";
import { useAccount } from "@web3modal/react";
import HeaderBase from "./HeaderBase";
import FooterBase from "./FooterBase";
import axios from "axios";

const Dashboard = () => {
	const { account } = useAccount();
	const [onChainScore, setOnChainScore] = React.useState<number | null>(null);

	const backendApiUrl = useEffect(() => {
		(async () => {
			if (!account.address) return;
			const response = await axios.get(
				`http://localhost:3000/?address=${account.address}`
			);
			const data = response.data;

			const score = data.score ?? 450;
			if (!score) return;
			setOnChainScore(score);
		})();
	}, [account.address]);

	const offChainScore = 500;
	const combinedScore = Math.round(((onChainScore ?? 450) + offChainScore) / 2);

	return (
		<Flex
			flexDir="column"
			alignItems="center"
			height="100vh"
			width="100%"
			className="bg-gradient-to-r from-[#eaf2ff] to-[#d4e4ff]"
		>
			<HeaderBase />
			<Flex width="100%">
				<Flex flex={1}>
					<CreditScoreCard
						creditScore={350}
						title="Your Overall Credit Score"
						description="A weighted Average of your On- & Off-Chain Credit Score"
					/>
				</Flex>
				<Flex flex={1}>
					<CreditScoreCard
						creditScore={onChainScore!}
						title="On-Chain Credit Score"
						description="calculated based on your On-Chain Behaviour & Activity"
						metrics={[
							"Total collateral value in ETH",
							"Total debt in ETH",
							"Total liquidity for wallet (ETH & USDC)",
							"Number of times liquidated",
						]}
					/>
				</Flex>
				<Flex flex={1}>
					<CreditScoreCard
						creditScore={350}
						title="Off-Chain Credit Score"
						description="calculated based on your Off-Chain Behaviour & Activity"
					/>
				</Flex>
			</Flex>
			<FooterBase />
		</Flex>
	);
};

export default Dashboard;
