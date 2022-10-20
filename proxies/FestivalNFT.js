import Provider from './Provider';
import festivalNFTABI from '../artifacts/contracts/FestivalNFT.sol/FestivalNFT.json';
import { festivalNFTAddress } from '../config'

const provider = new Provider();

const FestivalNFT = () => {
  const web3 = provider.web3;

  return new web3.eth.Contract(festivalNFTABI, festivalNFTAddress);
};

export default FestivalNFT;
