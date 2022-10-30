import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";

import {
	useAccount,
	ConnectButton,
	useConnectModal,
	Web3Button,
} from "@web3modal/react";
import Image from "next/image";

const Header: NextPage = () => {
	const { isOpen, open, close } = useConnectModal();
	const { account } = useAccount();
	return (
		<Flex
			flexDir="row"
			justifyContent="space-between"
			width="80%"
			backgroundColor="#38B5DCA1"
			borderRadius="12px"
		>
			<Image src={"/images/o_donut.png"} width={40} height={40} alt="donut" />
			<Heading fontFamily={"Chewy"} color="white">
				Credough
			</Heading>
			{!account.isConnected ? <ConnectButton /> : <Web3Button />}
		</Flex>
	);
};

export default Header;
