import { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { connectWallet } from '../lib/connectWallet'

import FestivalFactoryABI from '../artifacts/contracts/FestivalTicketsFactory.sol/FestivalTicketsFactory.json'
import FestTokenABI from '../artifacts/contracts/FestToken.sol/FestToken.json'
import FestivalNFTABI from '../artifacts/contracts/FestivalNFT.sol/FestivalNFT.json'
import FestivalMarketplaceABI from '../artifacts/contracts/FestivalMarketplace.sol/FestivalMarketplace.json'

import { festivalTicketsFactoryAddress, festTokenAddress, festivalNFTAddress, festivalMarketplaceAddress } from '../config'

const Festivals = () => {

  let provider
  const [festivals, setFestivals] = useState([])

  useEffect(() => {
    updateFestivals()
  }, [])

  const updateFestivals = async () => {

    provider = await connectWallet()
    const FestivalTicketsFactory = new ethers.Contract(festivalTicketsFactoryAddress, FestivalFactoryABI.abi, provider.getSigner())
    const FestivalNFT = new ethers.Contract(festivalNFTAddress, FestivalNFTABI.abi, provider)

    try {
      const web3 = await new Web3(window.ethereum);
      const initiator = await web3.eth.getCoinbase();

      const activeFests = await FestivalTicketsFactory.getActiveFests()

      const fests = await Promise.all(activeFests.map(async fest => {
        const festDetails = await FestivalTicketsFactory.getFestDetails(fest)
        const [festName, festSymbol, ticketPrice, totalSupply, marketplace] = Object.values(festDetails);
        const saleId = await FestivalNFT.getNextSaleTicketId()
        return (
          <tr key={fest}>
            <td className="center">{festName}</td>
            <td className="center">{web3.utils.fromWei(ticketPrice.toString(), 'ether')}</td>
            <td className="center">{totalSupply - saleId}</td>
            <td className="center"><button type="submit" className="custom-btn login-btn" onClick={e => purchaseTicket(marketplace, ticketPrice, initiator)}>Buy</button></td>
          </tr>
        )
      }))

      setFestivals(fests);
    } catch (err) {
      console.log('Error while updating the festivals', err)
    }
  }

  const purchaseTicket = async (marketplace, ticketPrice, initiator) => {
    // console.log(marketplace, ticketPrice);
    provider = await connectWallet()

    const FestToken = new ethers.Contract(festTokenAddress, FestTokenABI.abi, provider.getSigner())
    const FestivalMarketplace = new ethers.Contract(festivalMarketplaceAddress, FestivalMarketplaceABI.abi, provider.getSigner())

    try {
      console.log("before");
      // const tx = await FestToken.approve(marketplace, ticketPrice)
      // console.log("tx", tx);
      const tx = await FestivalMarketplace.approve(marketplace, ticketPrice)
      console.log(tx);
      await FestivalMarketplace.purchaseTicket()
      await updateFestivals()

      console.log(`Success, ticket for the Festival purchased successfully!`);
    } catch (err) {
      console.log('Error while purchasing a ticket', err);
    }
  }

  return (
    <div className="container col s12 m6 offset-m3 l4 offset-l4 z-depth-6 card-panel">
      <h4 className="center">Purchase Tickets</h4>
      <table id='requests' className="responsive-table striped" >
        <thead>
          <tr>
            <th key='name' className="center">Name</th>
            <th key='price' className="center">Price(in FEST)</th>
            <th key='left' className="center">Tickets Left</th>
            <th key='purchase' className="center">Purchase</th>
          </tr>
        </thead>
        <tbody className="striped highlight">
          {festivals}
        </tbody>
      </table>
    </div >
  )
}

export default Festivals
