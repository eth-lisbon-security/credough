import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { Sniglet } from "@next/font/google";

const sniglet = Sniglet({ weight: "400" });

import Image from "next/image";

const Journey: NextPage = () => {
	return (
		<Flex
			flexDir="column"
			justifyContent="space-between"
			maxWidth="80%"
			borderRadius="15px"
			p={5}
			pb={50}
		>
			<Flex
				flexDir="row"
				justifyContent={"space-evenly"}
				alignItems="center"
				pt={10}
			>
				<Flex width="50%">
					<main className="mt-10 max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 font-sniglet">
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block xl:inline">
									Your <span style={{ color: "#38B5DCA1" }}>whole</span> credit
									reputation decentralized
								</span>
							</h1>
							<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
								Credough offers an API service which can be used with an oracle
								service such as iExec to determine whether a user is
								creditworthy when borrowing on a DeFi lending protocol.
							</p>
							<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
								Mint your Ethereum Reputation Score on Credough as a soul bound
								token, and enhance your financial standing on the blockchain.
							</p>
						</div>
					</main>
				</Flex>
				<Flex width="40%" alignItems="center" height={"30vh"}>
					<Image
						src={"/images/app_mock.png"}
						width={350}
						height={350}
						alt="donuts"
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Journey;
