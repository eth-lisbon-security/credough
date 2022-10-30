import { Network, Alchemy, AssetTransfersCategory } from "alchemy-sdk";

const settings = {
  apiKey: "OnjMFLOkaDYK6WwbOvqyVEM5tnQcHAIG", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const addressTo = "0x5E135F1eecB6bD822913781b0CbA323c12dFD452";

async function getTransfersIn(address: string) {
  const transfers = alchemy.core.getAssetTransfers({
    category: [AssetTransfersCategory.EXTERNAL],
    fromBlock: "0x0",
    toBlock: "latest",
    toAddress: address,
    excludeZeroValue: true,
  });
}

// Optional Config object, but defaults to demo api-key and eth-mainnet.
