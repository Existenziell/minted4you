import { ethers } from 'ethers'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Link from 'next/link'
import Image from 'next/image'
import AppContext from '../context/AppContext'
import convertSlug from '../lib/convertSlug'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { events } from '../lib/events'

// import {
//   nftaddress, nftmarketaddress
// } from '../config'

// import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
// import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

const Exchange = () => {
  // const [nfts, setNfts] = useState([])
  // const [loadingState, setLoadingState] = useState('not-loaded')

  // const context = useContext(AppContext)
  // let isCorrectChain = context.state.isCorrectChain
  // let provider = context.state.provider

  // useEffect(() => {
  //   if (isCorrectChain && provider) loadNFTs()
  // }, [isCorrectChain, loadingState])

  // async function loadNFTs() {
  //   const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  //   const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
  //   const data = await marketContract.fetchMarketItems()
  //   const items = await Promise.all(data.map(async i => {
  //     const tokenUri = await tokenContract.tokenURI(i.tokenId)
  //     const meta = await axios.get(tokenUri)
  //     let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
  //     let item = {
  //       price,
  //       tokenId: i.tokenId.toNumber(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       image: meta.data.image,
  //       name: meta.data.name,
  //       description: meta.data.description,
  //     }
  //     return item
  //   }))
  //   setNfts(items)
  //   setLoadingState('loaded')
  // }

  // async function buyNft(nft) {
  //   // Check MetaMask
  //   const web3Modal = new Web3Modal({
  //     network: "mumbai",
  //     cacheProvider: true,
  //   })
  //   const connection = await web3Modal.connect()
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()
  //   const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

  //   const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
  //   const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
  //     value: price
  //   })
  //   await transaction.wait()

  //   loadNFTs()
  // }

  // if (!context.state.isCorrectChain)
  //   return (
  //     <div className='mt-16'>
  //       <p className='text-lg'>We operate on the Polygon Mumbai Testnet (80001).<br />Please change your network to proceed.</p>
  //       <p className='mt-2 text-sm'><a href='https://blog.pods.finance/guide-connecting-mumbai-testnet-to-your-metamask-87978071aca8' target='_blank' className='link'>This</a> article can help with that.</p>
  //     </div>
  //   )

  // if (loadingState === 'not-loaded')
  //   return (
  //     <div className='flex flex-col items-center justify-center text-brand mt-16'>
  //       <p className='text-xl mb-8'>Loading assets from the blockchain...</p>
  //       <ScaleLoader size={25} color='var(--color-brand)' />
  //     </div>
  //   )

  return (
    <div className="px-4 pb-16 mt-16">
      <h1 className="text-2xl md:text-4xl mb-16">Minted<span className='text-highlight'>4</span>you</h1>

      {events.map((e, index) => {
        return (
          <Link href={`/events/${e.slug}`} key={index}>
            <a>

              <div className='relative flex justify-left items-center gap-8 bg-header1 bg-no-repeat bg-cover h-64 mx-2 mb-2'>
                {/* <Image src={`/events/header${index + 1}.png`} alt='Event1' width={1320} height={280} /> */}
                <div className='text-2xl text-brand-dark font-extrabold rounded backdrop-blur-sm bg-white bg-opacity-30 md:flex items-center px-2 py-4 ml-4'>
                  <p className='w-16 inline-block'>
                    {e.date[0]}
                  </p>
                  <span className='pt-0 block md:inline-block'>-</span>
                  <p className='w-16 block md:inline-block'>
                    {e.date[1]}
                  </p>
                </div>

                <div className='text-left'>
                  <h2 className='text-4xl mb-4'>{e.name}</h2>
                  <div>
                    <span className='text-sm text-gray-300'>LOCATION</span>
                    <span className='text-lg block'>{e.location}</span>
                  </div>
                  <p className='text-highlight'>
                    <Link href={`/events/${e.slug}`}><a>View Event</a></Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-highlight inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>

              </div>

              {/* <div className='flex flex-wrap'>
              {e.tickets.map((t, i) => {
                return (
                  <div className='w-full  md:w-1/2 lg:w-1/3 rounded p-2 relative' key={i}>
                    <Image src={`/events/${i + 1}.png`} alt={`Ticket-${i + 1}`} width={576} height={1024} />

                    <div className='absolute left-0 bottom-0 right-0 bg-brand-dark bg-opacity-60 backdrop-blur-sm text-left p-4'>
                      <div className='px-4 flex flex-col justify-evenly h-full'>
                        <div className='absolute top-4 right-4 rounded bg-white bg-opacity-60 backdrop-blur-sm px-2 py-1'>
                          <p className='text-xs text-right'>SECTION<span className='block text-lg'>{t.section}</span></p>
                        </div>
                        <p className='text-xs text-gray-100 mb-8'>SALE</p>
                        <p className='mb-2 text-2xl w-56'>{e.name}: {e.country}</p>
                        <p className='text-lg'>{t.name}</p>

                        <hr className='my-8' />

                        <div className='flex justify-between'>
                          <div className='flex flex-col'>
                            <span className='text-xs text-gray-100'>PRICE</span>
                            <span className='mt-2'>${t.price}</span>
                          </div>
                          <div className='text-right flex flex-col w-2/3'>
                            <span className='text-xs text-gray-100 mb-2'>LOCATION</span>
                            <span>{e.location}</span>
                          </div>
                        </div>
                        <button className='button mt-8 mb-4 w-full'>Buy Now</button>
                      </div>
                    </div>

                  </div>

                )
              })}
            </div> */}

            </a>
          </Link>
        )
      })}
      <p className='mt-16 text-8xl'>...</p>
      <p className='text-lg'>More events coming very soon!</p>
    </div>
  )
}

export default Exchange
