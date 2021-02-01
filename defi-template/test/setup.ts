const { legos } = require('@studydefi/money-legos');
const { expect } = require('chai');
const { Contract, ethers, BigNumber } = require('ethers');
const { parseEther, formatUnits, parseUnits } = ethers.utils;

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC).connect(provider);
const gasLimit = process.env.GAS_LIMIT;

// const contractArtifact = require('../build/contracts/CustomContract.json');
// let customContract = new Contract(
//   contractArtifact.networks[process.env.NETWORK_ID].address,
//   contractArtifact.abi,
//   wallet
// );

const DAI = new Contract(legos.erc20.dai.address, legos.erc20.dai.abi, wallet);
const BAT = new Contract(legos.erc20.bat.address, legos.erc20.bat.abi, wallet);

const GAS_LIMIT = process.env.GAS_LIMIT;

export {
  wallet,
  //customContract,
  parseEther,
  formatUnits,
  parseUnits,
  BigNumber,
  Contract,
  ethers,
  expect,
  legos,
  DAI,
  BAT,
  GAS_LIMIT,
};
