import Web3 from 'web3';
import { ethers } from 'ethers'

class Provider {
  constructor() {
    const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
    // const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/eth/rinkeby`
    const provider = new ethers.providers.JsonRpcProvider(nodeUrl)
    return provider
    // this.web3 = new Web3(
    //   new Web3.providers.HttpProvider('http://127.0.0.1:8545'),
    // );
  }
}

export default Provider;
