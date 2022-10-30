/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Heading, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
const Plot = require("react-plotly.js");

const Papa = require("papaparse");

import csvjson from "../public/csvjson.json";

const ScatterPlot: NextPage = () => {
  const xArr = [];
  const yArr = [];

  for (let i = 0; i < csvjson.length; i++) {
    xArr.push(csvjson[i]["Collateral Value"]);
    yArr.push(csvjson[i]["Credit Score"]);
  }

  return (
    <Flex flexDir="column" alignItems="center" p={5}>
      <Plot
        data={[
          {
            x: xArr,
            y: yArr,
            type: "scatter",
            mode: "markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </Flex>
  );
};

export default ScatterPlot;
