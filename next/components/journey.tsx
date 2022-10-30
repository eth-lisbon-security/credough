import type { NextPage } from "next";
import {
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import { Chewy } from "@next/font/google";

const chewy = Chewy({ weight: "400" });

import Image from "next/image";

const Journey: NextPage = () => {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      //height="5vh"
      width="90%"
      mt={50}
      borderRadius="15px"
      p={5}
    >
      <Flex flexDir={"column"} width="50%">
        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Data to enrich your</span>{" "}
              <span className="block text-indigo-600 xl:inline">
                online business
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </main>
      </Flex>
      <Flex flexDir={"column"} width="40%" alignItems="center">
        <Image src={"/images/o_donut.png"} width={250} height={250}></Image>
      </Flex>
    </Flex>
  );
};

export default Journey;
