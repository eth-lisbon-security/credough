const ethers = require("ethers");
const fs = require("fs");

const ProofOfHumanityABI_file = "./ProofOfHumanityABI.json";
const ProofOfHumanityABI = JSON.parse(fs.readFileSync(ProofOfHumanityABI_file));
const ProofOfHumanityAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb";
const provider = new ethers.providers.AlchemyProvider(
  "homestead",
  "1_JJv9SKb8mUqB_i3mU8-nqrYRsI6naL"
);

const signer = new ethers.Wallet(
  "60ccd63e649a2e36654cac3414bbcbc8472c24188589d2be5a72f0334feddca8",
  provider
);

const testAddress = "0x21C8dc59f2E9A11c4C1a0C310641968132c6b1Be";

async function getProofOfHumanity(address: string) {
  const ProofOfHumanity = new ethers.Contract(
    ProofOfHumanityAddress,
    ProofOfHumanityABI,
    signer
  );
  const submission = await ProofOfHumanity.getSubmissionInfo(address);
  return submission.registered;
}
