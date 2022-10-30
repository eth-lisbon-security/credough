import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

type Props = {
	creditScore: number;
};

const CreditScoreCard = ({ creditScore }: Props) => {
	return (
		<Flex>
			<Text>Credit Score</Text>
			<Flex>
				<Box>Rating</Box>
				<Heading>{creditScore}</Heading>
				<Text>{creditScore} out of 800</Text>
			</Flex>
			<Box></Box>
		</Flex>
	);
};

export default CreditScoreCard;
