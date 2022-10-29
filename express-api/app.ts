import { request, gql } from "graphql-request";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getCompoundData } from "./services/compound";

const app: Express = express();
const port = process.env.PORT ?? 3000;

const testAddress = "0x21C8dc59f2E9A11c4C1a0C310641968132c6b1Be";

app.get("/", async (req: Request, res: Response) => {
	const response = await getCompoundData(testAddress);
	return res.send(response.data.requests);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
