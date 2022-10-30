import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Web3Modal } from "@web3modal/react";
import { chains, providers } from "@web3modal/ethereum";

// Configure web3modal
const modalConfig = {
  projectId: "0ba16e543126b61aaaa98e7b788743fe",
  theme: "light" as const,
  accentColor: "default" as const,
  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [chains.mainnet, chains.goerli],
    providers: [
      providers.walletConnectProvider({
        projectId: "0ba16e543126b61aaaa98e7b788743fe",
      }),
    ],
  },
};

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider {...theme}>
      <Component {...pageProps} />
      <Web3Modal config={modalConfig} />
    </ChakraProvider>
  );
}

export default MyApp;
