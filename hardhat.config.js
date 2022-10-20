require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
const fs = require('fs')

const privateKey = fs.readFileSync(".secret").toString().trim() || ""
const privateKeyMumbai = fs.readFileSync('.secretMumbai').toString().trim() || ''
const privateKeyRinkeby = fs.readFileSync('.secretRinkeby').toString().trim() || ''
const privateKeyRopsten = fs.readFileSync('.secretRopsten').toString().trim() || ''
const infuraId = fs.readFileSync(".infuraid").toString().trim() || ""
const moralisId = fs.readFileSync(".moralisid").toString().trim() || ""

module.exports = {
  defaultNetwork: "hardhat",
  networks: {

    // LOCAL
    hardhat: {
      chainId: 1337
    },

    // TESTNET
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      // Moralis
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mumbai`,
      // url: "https://rpc-mumbai.matic.today",
      accounts: [privateKeyMumbai]
    },
    ropsten: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/ropsten`,
      accounts: [privateKeyRopsten]
    },
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/rinkeby`,
      accounts: [privateKeyRinkeby]
    },
    goerli: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/goerli`,
      accounts: [privateKey]
    },
    kovan: {
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/kovan`,
      accounts: [privateKey]
    },

    // MAINNET
    polygon: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      // Moralis
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/polygon/mainnet`,
      // url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    },
    eth: {
      // Infura
      // url: `https://mainnet.infura.io/v3/${infuraId}`,
      // Moralis
      url: `https://speedy-nodes-nyc.moralis.io/${moralisId}/eth/mainnet`,
      // url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: '0.8.4',

    // compilers: [
    //   { version: "0.6.0" },
    //   { version: "0.6.2" },
    //   { version: "0.7.0" },
    //   { version: "0.7.6" },
    //   { version: "0.8.0" },
    //   { version: "0.8.1" },
    //   { version: "0.8.12" },
    //   { version: "0.9.0" },
    // ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: 'UTJD3EC6SMFYZDJ77E7TTFGCKD1TN7N4XW'
  }
}
