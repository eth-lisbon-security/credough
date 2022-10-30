import axios from "axios";
import { request, gql } from "graphql-request";
import ethers, { BigNumber } from "ethers";
import erc20Abi from "../abi/erc20.json";

const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const provider = new ethers.providers.AlchemyProvider(
	"mainnet",
	"rOiQsk0cIqALCVVNiqeBhir4vk388VC_"
);

function toFixed(x: number) {
	if (Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split("e-")[1]);
		if (e) {
			return 0;
		}
	}
	return x;
}

const BASE_GRAPH_URI =
	"https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2";

async function getCompoundData(address: string) {
	return (
		await axios.get(
			`https://api.compound.finance/api/v2/account?addresses[]=${address}`
		)
	).data;
}

async function getScoreOnCompound(address: string) {
	const SCORE_WITHOUT_BORROW = 400;

	const query = gql`
  {
    account(id: "${address}") {
      id,
      countLiquidated,
      countLiquidator,
      hasBorrowed,
      health,
      totalBorrowValueInEth,
      totalCollateralValueInEth
    }
  }
  `;

	const [compoundDetails, liquidityScore] = await Promise.all([
		request(BASE_GRAPH_URI, query),
		getLiquidityScore(address),
	]);

	const {
		id,
		countLiquidated,
		countLiquidator,
		hasBorrowed,
		health,
		totalBorrowValueInEth: borrowValueInEth,
		totalCollateralValueInEth: collateralInEth,
	} = compoundDetails?.account ?? {};

	// Undefined score
	if (!hasBorrowed) {
		return SCORE_WITHOUT_BORROW;
	}

	const totalBorrowValueInEth = toFixed(borrowValueInEth);
	const totalCollateralValueInEth = toFixed(collateralInEth);

	// Numbers range from 300 -> 300 + 550
	const maxRange = 550;
	const minValue = 300;

	// Aribritary numbers
	const growthRate = 2;

	let compoundScore =
		(totalCollateralValueInEth ?? 0) /
		((countLiquidated ?? 0) == 0
			? 1
			: (countLiquidated ?? 0) * (totalBorrowValueInEth ?? 0));

	let liquidityScoreModified =
		liquidityScore < BigNumber.from(1) ? BigNumber.from(1) : liquidityScore;
	const leverageRatio = BigNumber.from(totalBorrowValueInEth ?? 0).div(
		BigNumber.from(liquidityScoreModified)
	);

	const score = BigNumber.from(compoundScore).mul(leverageRatio);

	const adjustedScore =
		BigNumber.from(maxRange)
			.div(1 + Math.round(Math.exp(-growthRate * score.toNumber())))
			.toNumber() + minValue;

	return adjustedScore;
}

async function getLiquidityScore(address: string) {
	const ethBalance = await provider.getBalance(address);

	const usdcContract = new ethers.Contract(
		USDC_CONTRACT_ADDRESS,
		erc20Abi,
		provider
	);

	const usdcBalance = await usdcContract.balanceOf(address);

	const coinApiData = (
		await axios.get("https://rest.coinapi.io/v1/exchangerate/ETH/USD", {
			headers: {
				"X-CoinAPI-Key": "4A568F30-7547-4C2E-B6D6-557ED94A063E",
			},
		})
	).data;

	const ethRateToUsd = coinApiData.rate;

	const totalValue = ethers.utils
		.parseEther(usdcBalance.toString())
		.div(BigNumber.from(Math.round(ethRateToUsd!)))
		.add(ethBalance);

	return totalValue;
}

export { getCompoundData, getScoreOnCompound };
