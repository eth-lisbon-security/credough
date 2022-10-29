const express = require("express");
const app = express();
import { request, gql } from "graphql-request";

const axios = require("axios");
const testAddress = "0x21C8dc59f2E9A11c4C1a0C310641968132c6b1Be";

const port = 3000;

function getCompoundData(address) {
  return axios.get(
    `https://api.compound.finance/api/v2/account?addresses[]=${address}`
  );
}

app.get(`/`, function (req, res) {
  getCompoundData(testAddress)
    .then(function (response) {
      console.log(response.data.request);
      res.send(response.data.request);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const query = gql`
  {
    user(id: "0xf48ed9a03fc6bb55949f08649cb54d792928cdfe") {
      id
    }
  }
`;

request("https://api.thegraph.com/subgraphs/name/aave/protocol-v2", query).then(
  (data) => console.log(data)
);

module.exports = app;
