import * as dotenv from "dotenv";
import { create as ipfsHttpClient } from "ipfs-http-client";

dotenv.config();

const projectId = process.env.ALCHEMY_IPFS_ID;
const projectSecret = process.env.ALCHEMY_IPFS_SECRET;
const authorization = `Basic ${Buffer.from(projectId + ":" + projectSecret)}`;

const ipfs = ipfsHttpClient({
	url: "https://ipfs.infura.io:5001/api/v0",
	headers: {
		authorization,
	},
});

export default ipfs;
