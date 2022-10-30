import React, { useEffect, useMemo } from "react";
import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";

type Props = {
	creditScore: number;
	title: string;
	metrics?: string[];
	description: string;
};

const creditScoreToGrade = (creditScore: number) => {
	if (creditScore <= 300) {
		return "F";
	} else if (creditScore <= 400) {
		return "E";
	} else if (creditScore <= 450) {
		return "D";
	} else if (creditScore <= 550) {
		return "C";
	} else if (creditScore <= 650) {
		return "B";
	} else if (creditScore <= 850) {
		return "A";
	}

	return "Unknown";
};

const CreditScoreCard = ({
	creditScore,
	title,
	metrics,
	description,
}: Props) => {
	const barWidth = useMemo(() => {
		const range = creditScore - 300;
		const percentage = (range / (850 - 300)) * 100;
		return percentage;
	}, [creditScore]);

	const grade = creditScoreToGrade(creditScore);

	return (
		<Box
			flexDir="column"
			px="12px"
			py="12px"
			borderRadius="16px"
			backgroundColor="white"
		>
			<Box>
				<Heading fontSize="xl">{title}</Heading>
				<Text>{description}</Text>
			</Box>
			<Divider my="3.5" />
			<Flex flexDir="row" justifyContent="space-between">
				<Box>
					<Heading fontWeight="light">Rating</Heading>
					<Heading fontSize="5xl">{creditScore}</Heading>
					<Text fontSize="xl">out of 850</Text>
				</Box>
				<Flex justifyContent="center" flexDir={"column"}>
					<Heading fontWeight="light">Grade</Heading>
					<Heading fontWeight="medium" textAlign="center" fontSize="5xl">
						{grade}
					</Heading>
				</Flex>
			</Flex>
			<Box mt="12px" height="48px">
				<Flex position="relative">
					<Box
						position="absolute"
						height="36px"
						width="100%"
						borderRadius="8px"
						backgroundColor="gray"
					/>
					<Box
						position="absolute"
						height="36px"
						width={barWidth}
						borderRadius="8px"
						backgroundColor="red"
					/>
				</Flex>
			</Box>

			{(metrics?.length ?? 0) > 0 && (
				<VStack>
					<Text fontWeight="bold">Used metrics</Text>
					{(metrics ?? [])
						.filter((text) => !!text)
						.map((data, id) => {
							return <Text key={data + id}>✔ {data}</Text>;
						})}
				</VStack>
			)}
		</Box>
	);
};

export default CreditScoreCard;
