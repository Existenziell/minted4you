import Provider from './Provider';
import festivalMarketplaceABI from '../artifacts/contracts/FestivalMarketplace.sol/FestivalMarketplace.json';
import { festivalMarketplaceAddress } from '../config'

const provider = new Provider();

const FestivalMarketplace = () => {
  const web3 = provider.web3;

  return new web3.eth.Contract(festivalMarketplaceABI, festivalMarketplaceAddress);
};

export default FestivalMarketplace;
