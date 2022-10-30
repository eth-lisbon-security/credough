import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Flex, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import CreditScoreCard, { creditScoreToGrade } from "./CreditScore";
import { useAccount, useSigner } from "@web3modal/react";
import HeaderBase from "./HeaderBase";
import FooterBase from "./FooterBase";
import axios from "axios";
import { ethers } from "ethers";

const getIpfsUrlFromScore = (score: string) => {
	if (score === "A") {
		return "QmYA9xzhNwgsoy3QcEV39ZajxnRv3BMm2mjr71aod8kF89";
	} else if (score === "B") {
		return "QmWfBtnBWSkVfSaZEJreMbu7Mq9NbfpCLcW42yUw7QJPsY";
	} else if (score === "C") {
		return "QmTCry6sHBzcnBwp9kTLBn5xpYYvhvwiag9BogjyrvhEav";
	} else if (score === "D") {
		return "Qmepnw6BMcpDEVLmGkaUiyzqtVEM6TyQBza8yyJqgXFy6i";
	} else if (score === "E") {
		return "QmUgSBs7FQ3BkjeDSPfJ79WcYR2q4tJonpZHSUUWh7EDuL";
	} else if (score === "F") {
		return "QmVMpgpJ4b2zE5Mrz232SFejimw5xkpMmDqW9qjGLUQY4n";
	}
};

enum MintingStatus {
	NOT_MINTED,
	MINTING,
	MINTED,
}

const Dashboard = () => {
	const { account } = useAccount();
	const { data: signer } = useSigner();

	const [mintingStatus, setMintingStatus] = React.useState<MintingStatus>(
		MintingStatus.NOT_MINTED
	);
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

	const [ipfsHash, setIpfsHash] = React.useState<string | null>(null);

	const handleButtonClick = useCallback(async () => {
		if (!signer) return;
		const factory = new ethers.Contract(
			"0xf344611ae8860CBf5A982Fc396f2Ae86073920ca",
			["function safeMint(address to, string memory uri)"],
			signer
		);

		const ipfs = getIpfsUrlFromScore(creditScoreToGrade(combinedScore));
		const tx = await factory.safeMint(await signer.getAddress(), ipfs);

		setIpfsHash(ipfs!);

		setMintingStatus(MintingStatus.MINTING);
		await tx.wait();
		setMintingStatus(MintingStatus.MINTED);
	}, [combinedScore, signer]);

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
			<Flex
				flexDir="column"
				backgroundColor={"white"}
				mt="24px"
				borderRadius="16px"
			>
				{mintingStatus === MintingStatus.MINTING ? (
					<Spinner />
				) : mintingStatus === MintingStatus.NOT_MINTED ? (
					<Flex
						flexDir="column"
						alignItems="center"
						px="16px"
						py="16px"
						borderRadius="16px"
					>
						<Heading mb="16px">Mint your Ethereum Reputation Score NFT</Heading>
						<Button maxW="150px" onClick={handleButtonClick}>
							Mint
						</Button>
					</Flex>
				) : (
					<Flex
						flexDir="column"
						alignItems="center"
						px="16px"
						py="16px"
						borderRadius="16px"
					>
						<Heading mb="16px">
							Minting successful, check the link at{" "}
							<Link>https://ipfs.io/ipfs/{ipfsHash}</Link>
						</Heading>
					</Flex>
				)}
			</Flex>
			<FooterBase />
		</Flex>
	);
};

export default Dashboard;
