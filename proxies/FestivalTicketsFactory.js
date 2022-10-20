import Provider from './Provider';
import FestivalFactoryABI from '../artifacts/contracts/FestivalTicketsFactory.sol/FestivalTicketsFactory.json';
import { festivalTicketsFactoryAddress } from '../config'
import { ethers } from 'ethers'

const provider = new Provider();

class FestivalFactory {
  constructor() {
    this.instance = new ethers.Contract(festivalTicketsFactoryAddress, FestivalFactoryABI.abi, provider)

    // const web3 = provider.web3;
    // this.instance = new web3.eth.Contract(
    //   FestivalFactoryABI.abi,
    //   festivalTicketsFactoryAddress,
    // );
  }

  getInstance = () => this.instance;
}

const festivalFactory = new FestivalFactory();
Object.freeze(festivalFactory);

export default festivalFactory.getInstance();
