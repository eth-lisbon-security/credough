import type { NextPage } from "next";
import { Button, Flex, Heading } from "@chakra-ui/react";

import {
	useAccount,
	ConnectButton,
	useConnectModal,
	Web3Button,
} from "@web3modal/react";
import Image from "next/image";
import { useRouter } from "next/router";

const HeaderBase: NextPage = () => {
	const { isOpen, open, close } = useConnectModal();
	const { account } = useAccount();
	const router = useRouter();

	return (
		<Flex
			//height="5vh"
			width="90%"
			borderRadius="15px"
			p={5}
			mt={35}
			justifyContent="space-between"
			flexDir="row"
		>
			<Flex alignItems={"center"}>
				<Image
					src={"/images/o_donut.png"}
					width={65}
					height={65}
					alt="donut"
				></Image>
				<Heading color="black" fontFamily={"Sniglet"} pl={3}>
					Credough
				</Heading>
			</Flex>
			{/*new code*/}
			{/*<Flex>{account.isConnected ? <Web3Button /> : <></>}</Flex>*/}
			{/*debug*/}
			<Flex>{!account.isConnected ? <ConnectButton /> : <Web3Button />}</Flex>
		</Flex>
	);
};

export default HeaderBase;
