import Provider from './Provider';
import FestToken from '../artifacts/contracts/FestToken.sol/FestToken.json';
import { festTokenAddress } from '../config'
import { ethers } from 'ethers'

const provider = new Provider();

class Token {
  constructor() {
    this.instance = new ethers.Contract(festTokenAddress, FestToken.abi, provider)

    // const web3 = provider.web3;
    // this.instance = new web3.eth.Contract(
    //   FestToken.abi,
    //   festTokenAddress,
    // );
  }

  getInstance = () => this.instance;
}

const token = new Token();
Object.freeze(token);

export default token.getInstance();
