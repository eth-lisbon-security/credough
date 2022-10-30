/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import type { NextPage } from "next";
import {
  Button,
  Flex,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  useAccount,
  ConnectButton,
  useConnectModal,
  Web3Button,
} from "@web3modal/react";

import Image from "next/image";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import apiJson from "../public/api.json";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const TabbedContainer: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();

  const [onChain, setOnChain] = useState(0);
  const [offChain, setOffChain] = useState(0);

  const router = useRouter();

  const handleAPICall = () => {};

  useEffect(() => {
    if (account.isConnected) {
      setOnChain(1);
    }
  }, [account.isConnected]);

  const handleButtonClick = async () => {
    console.log(apiJson);

    setOffChain(1);
    //const bodyFormData = new FormData();
    //bodyFormData.append("email", "Thiahveona@gmail.com");
    //bodyFormData.append("password", "Success09$");
    //bodyFormData.append("ssn", "2111");
    //console.log(bodyFormData);
    //const response = axios({
    //  method: "post",
    //  url: "http://3.91.213.94/getData/",
    //  data: bodyFormData,
    //  headers: { "Content-Type": "multipart/form-data" },
    //})
    //  .then(function (response) {
    //    //handle success
    //    console.log(response);
    //    return response;
    //  })
    //  .catch(function (response) {
    //    //handle error
    //    console.log(response);
    //  });
  };

  return (
    <Flex flexDir={"column"}>
      <Tabs>
        <TabList>
          <Tab>Get On-Chain Data</Tab>
          <Tab>Get Off-Chain Data</Tab>
        </TabList>

        <Flex justifyContent={"center"}>
          <TabPanels>
            <TabPanel>
              <Flex
                justifyItems={"center"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {!account.isConnected ? <ConnectButton /> : <Web3Button />}
              </Flex>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">USA</option>
                </Select>
              </FormControl>

              <Button
                onClick={handleButtonClick}
                mt="12px"
                className="bg-sniglet-blue"
              >
                Get Off-Chain Data
              </Button>

              <Flex
                flexDir={"column"}
                alignContent={"center"}
                alignItems={"center"}
                verticalAlign={"center"}
              ></Flex>
              <Button
                disabled={onChain === 0 || offChain === 0}
                className="bg-white rounded-xl"
                onClick={() => router.push("/dashboard")}
              >
                Show Dashbaord
              </Button>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};
export default TabbedContainer;
