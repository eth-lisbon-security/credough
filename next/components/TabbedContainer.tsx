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
//import axios from "axios";
import apiJson from "../public/api.json";

const TabbedContainer: NextPage = () => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();

  const handleButtonClick = async () => {
    console.log(apiJson);
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
                {account.isConnected ? <ConnectButton /> : <Web3Button />}
              </Flex>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">USA</option>
                </Select>
              </FormControl>

              <Button onClick={handleButtonClick}></Button>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};
export default TabbedContainer;
