import { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'

import FestivalFactoryABI from '../artifacts/contracts/FestivalTicketsFactory.sol/FestivalTicketsFactory.json'
import FestTokenABI from '../artifacts/contracts/FestToken.sol/FestToken.json'
import FestivalNFTABI from '../artifacts/contracts/FestivalNFT.sol/FestivalNFT.json'

import { festivalTicketsFactoryAddress, festTokenAddress, festivalNFTAddress, festivalMarketplaceAddress } from '../config'

// import FestToken from '../artifacts/contracts/FestToken.sol/FestToken.json'
// import FestivalTicketsFactory from '../artifacts/contracts/FestivalTicketsFactory.sol/FestivalTicketsFactory.json'
// import FestivalNFT from '../artifacts/contracts/FestivalNFT.sol/FestivalNFT.json'
// import FestivalMarketplace from '../artifacts/contracts/FestivalMarketplace.sol/FestivalMarketplace.json'

// import FestivalTicketsFactory from '../proxies/FestivalTicketsFactory';
// import FestToken from '../proxies/FestToken';
// import FestivalNFT from '../proxies/FestivalNFT';
// import FestivalMarketplace from '../proxies/FestivalMarketplace';

const Festival = () => {

  const chainId = 3 // (Local:1337 | Mumbai: 80001 | Ropsten:3 | Rinkeby: 4)
  let provider

  async function connectWallet() {
    // Check MetaMask
    provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    // Prompt user for account connections
    try {
      await provider.send('eth_requestAccounts', [])
    } catch (error) {

      console.log('Please connect your account in Metamask.')
      return
    }

    const network = await provider.getNetwork()

    if (network.chainId === chainId) {
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      console.log('Wallet connected!')
    } else {
      console.log('Please change network to Polygon Testnet in Metamask.')
    }
  }

  // const nodeUrl = `https://speedy-nodes-nyc.moralis.io/661d2cac001d8e6c33d63f3a/polygon/mumbai`
  // const provider = new ethers.providers.JsonRpcProvider(nodeUrl)

  const [formData, setFormData] = useState()
  // let web3

  const setData = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, ...{ [name]: value } })
  }

  // useEffect(() => {
  //   connectWallet()
  // }, [])

  const createFestival = async (e) => {
    e.preventDefault()

    await connectWallet()

    const FestivalTicketsFactory = new ethers.Contract(festivalTicketsFactoryAddress, FestivalFactoryABI.abi, provider.getSigner())
    const FestToken = new ethers.Contract(festTokenAddress, FestTokenABI.abi, provider)
    const FestivalNFT = new ethers.Contract(festivalNFTAddress, FestivalNFTABI.abi, provider.getSigner())

    try {
      const web3 = await new Web3(window.ethereum);

      const organiser = await web3.eth.getCoinbase();
      const { name, symbol, price, supply } = await formData;

      const transaction = await FestivalTicketsFactory.createNewFest(
        FestToken.address,
        name,
        symbol,
        web3.utils.toWei(price, 'ether'),
        supply)

      console.log(transaction);
      console.log(transaction.events);

      console.log('Festival Created Successfully!');

      // const nftInstance = await FestivalNFT(FestivalNFTAddress);
      const batches = Math.ceil(supply / 30);
      let batchSupply = 30;
      let curCount = 0
      let prevCount = 0

      if (supply < 30) {
        const res = await FestivalNFT.bulkMintTickets(supply, festivalMarketplaceAddress)
      } else {
        for (let i = 0; i < batches; i++) {
          prevCount = curCount;
          curCount += 30;
          if (supply < curCount) {
            batchSupply = supply - prevCount;
          }
          const res = await FestivalNFT.bulkMintTickets(batchSupply, festivalMarketplaceAddress)
        }
      }
    } catch (err) {
      console.log('Error while creating new festival', err);
    }
  }

  return (
    <div className="container center" >
      <div className="row">
        <div className="container ">
          <div className="container ">
            <h5 style={{ padding: "30px 0px 0px 10px" }}>Create new Festival</h5>
            <form className="" onSubmit={createFestival}>
              <label className="left">Fest Name</label><input id="name" placeholder="Fest Name" type="text" className="validate" name="name" onChange={setData} /><br /><br />
              <label className="left">Fest Symbol</label><input id="symbol" placeholder="Fest Symbol" type="text" className="input-control" name="symbol" onChange={setData} /><br /><br />
              <label className="left">Ticket Price</label><input id="price" placeholder="Ticket Price" type="text" className="input-control" name="price" onChange={setData} /><br /><br />
              <label className="left">Total Supply</label><input id="supply" placeholder="Total Supply" type="text" className="input-control" name="supply" onChange={setData} /><br /><br />

              <button type="submit" className="custom-btn login-btn">Create Festival</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Festival;
