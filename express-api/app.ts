import { request, gql } from "graphql-request";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
