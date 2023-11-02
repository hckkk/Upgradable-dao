/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config()

const { usr_API_URL, usr_PRIVATE_KEY, attack_API_URL, attack_PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: usr_API_URL,
      accounts: [`0x${usr_PRIVATE_KEY}`],
    },
    attack: {
      url: attack_API_URL,
      accounts: [`0x${attack_PRIVATE_KEY}`],
    },
  },
};
