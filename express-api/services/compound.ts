import axios from "axios";
import { request, gql } from "graphql-request";
import BigNumber from "bignumber.js";

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

	const compoundDetails = await request(BASE_GRAPH_URI, query);
	console.log("compoundDetails", compoundDetails);

	const {
		id,
		countLiquidated,
		countLiquidator,
		hasBorrowed,
		health,
		totalBorrowValueInEth,
		totalCollateralValueInEth,
	} = compoundDetails.account;
	console.log("hasBorrowed", hasBorrowed);

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
		BigNumber(maxRange)
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

export { getCompoundData, getScoreOnCompound };
