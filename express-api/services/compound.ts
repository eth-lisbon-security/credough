import axios from "axios";
import { request, gql } from "graphql-request";
import ethers, { BigNumber } from "ethers";
import erc20Abi from "../abi/erc20.json";

const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// TODO: Use "toFixed" to round off the score to 2 decimal places
// function toFixed(x: string) {
// 	if (Math.abs(x) < 1.0) {
// 		var e = parseInt(x.toString().split("e-")[1]);
// 		if (e) {
// 			x *= Math.pow(10, e - 1);
// 			x = "0." + new Array(e).join("0") + x.toString().substring(2);
// 		}
// 	} else {
// 		var e = parseInt(x.toString().split("+")[1]);
// 		if (e > 20) {
// 			e -= 20;
// 			x /= Math.pow(10, e);
// 			x += new Array(e + 1).join("0");
// 		}
// 	}
// 	return x;
// }

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
		totalBorrowValueInEth,
		totalCollateralValueInEth,
	} = compoundDetails?.account ?? {};

	// Undefined score
	if (!hasBorrowed) {
		return null;
	}

	const maxRange = 550;
	const growthRate = 2;
	const minValue = 300;

	let score =
		totalCollateralValueInEth /
		(countLiquidated == 0 ? 1 : countLiquidated * totalBorrowValueInEth);
	console.log(score);

	const adjustedScore =
		BigNumber.from(maxRange)
			.div(1 + Math.exp(-growthRate * score))

			.toNumber() + minValue;

	/**
	 * 1. totalCollateralValue -> positive correlation
	 * 2. totalBorrowValue -> negative correlation
	 * 3. health -> positive correlation
	 * 4. countLiquidated -> (dependant)
	 * 5.
	 *
	 */

	return adjustedScore;
}

async function getLiquidityScore(address: string) {
	const provider = ethers.providers.getDefaultProvider();
	const ethBalance = await provider.getBalance(address);

	const usdcContract = new ethers.Contract(
		USDC_CONTRACT_ADDRESS,
		erc20Abi,
		provider
	);

	const usdcBalance = await usdcContract.balanceOf(address);

	const coinGeckoData = (
		await axios.get(
			"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
		)
	).data;

	let ethPrice: number;
	for (const [coinGeckoId, coinDetails] of Object.entries(coinGeckoData)) {
		const { usd } = coinDetails as Record<string, unknown>;
		ethPrice = usd as number;
	}

	const totalValue =
		BigNumber.from(ethers.utils.formatEther(usdcBalance)).div(
			BigNumber.from(ethPrice!)
		) + ethers.utils.formatEther(ethBalance);

	return totalValue;
}

export { getCompoundData, getScoreOnCompound };
