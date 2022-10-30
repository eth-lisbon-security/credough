import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { Sniglet } from "@next/font/google";

const sniglet = Sniglet({ weight: "400" });

import Image from "next/image";

const Journey: NextPage = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      maxWidth="80%"
      borderRadius="15px"
      p={5}
      pb={50}
    >
      <Flex
        flexDir="row"
        justifyContent={"space-evenly"}
        alignItems="center"
        pt={10}
      >
        <Flex width="50%">
          <main className="mt-10 max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 font-sniglet">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Data to enrich your</span>{" "}
                <span className="block text-sniglet-blue xl:inline">
                  online business
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              {/*<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-sniglet-blue px-8 py-3 text-base font-medium text-white hover:bg-sniglet-blue-dark md:py-4 md:px-10 md:text-lg"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-sniglet-blue-dark hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Live demo
                  </a>
                </div>
              </div>*/}
            </div>
          </main>
        </Flex>
        <Flex width="40%" alignItems="center" height={"30vh"}>
          <Image
            src={"/images/app_mock.png"}
            width={350}
            height={350}
            alt="donuts"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Journey;
