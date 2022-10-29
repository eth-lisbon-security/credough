import axios from "axios";

function getCompoundData(address) {
	return axios.get(
		`https://api.compound.finance/api/v2/account?addresses[]=${address}`
	);
}

export { getCompoundData };
