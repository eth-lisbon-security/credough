import { request, gql } from "graphql-request";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getCompoundData, getScoreOnCompound } from "./services/compound";

const app: Express = express();
const port = process.env.PORT ?? 3000;

const testAddress = "0x21C8dc59f2E9A11c4C1a0C310641968132c6b1Be";

app.get("/", async (req: Request, res: Response) => {
	const userAddress = req.query.address;

	if (!userAddress) {
		res.status(400).send("No address provided");
		return;
	}
	const score = await getScoreOnCompound(userAddress as string);
	return res.send({ score });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
