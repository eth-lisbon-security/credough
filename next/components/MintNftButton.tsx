import { Button, Flex, Spinner, StyleProps } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { provider } from "../utils/ethers";
import { ethers } from "ethers";

type Props = {
	creditScore: number;
} & StyleProps;

const MintNftButton = ({ creditScore, ...rest }: Props) => {
	const [isMinting, setIsMinting] = useState<boolean>(false);

	const handleClick = useCallback(async () => {
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			"0x79fbae85d230fa05b117c102d8e1f808dedd7c67",
			["function safeMint(address to, string memory uri) public"],
			signer
		);

		const currentAddress = await signer.getAddress();

		setIsMinting(true);

		// TODO: Upload IPFS with credit score
		const transaction = await contract.mintNFT(
			currentAddress,
			creditScore + ""
		);
		await transaction.wait();
		setIsMinting(false);
	}, [creditScore]);

	return (
		<>
			{isMinting ? (
				<Spinner />
			) : (
				<Button onClick={handleClick} {...rest}>
					Mint NFT
				</Button>
			)}
		</>
	);
};

export default MintNftButton;
