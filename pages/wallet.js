import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import connect from '../lib/connect'

export default function MyAssets() {

  const [nfts, setNfts] = useState([])
  const [balance, setBalance] = useState(0)
  let accountAddress

  const fetchNfts = async () => {
    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    await fetch('https://api.opensea.io/api/v1/assets?owner=0x28604844072F6A5F554B0fDA4766dC2E9302A6eE&order_direction=desc&limit=50&include_orders=true', options)
      .then(response => response.json())
      .then(response => {
        setNfts(response.assets)
        console.log(nfts)
      })
      .catch(err => console.error(err));
  }

  const connectWallet = async () => {
    accountAddress = await connect()
    console.log(accountAddress);
    getWalletDetails(accountAddress)
  }

  const getWalletDetails = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(address)
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance)
    console.log(`balance: ${balanceInEth} ETH`)
    setBalance(balanceInEth)
  }


  useEffect(() => {

    connectWallet()
    // fetchNfts()

    window.ethereum.on("accountsChanged", async () => {
      connectWallet()
    })
  }, [])

  // if (!nfts)
  //   return (
  //     <p className="mt-16">
  //       Loading
  //     </p>
  //   )

  return (

    <div className="flex flex-col justify-center items-center mt-16">
      <h1 className="text-2xl md:text-4xl mb-8">My Wallet</h1>
      <p className='flex gap-4'>Wallet balance: {balance}</p>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
          {/* {
            nfts.map((nft, i) => (
              <div key={i} className="border border-brand text-brand-dark shadow rounded overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-brand">
                  <p className="text-2xl font-semibold mb-4">{nft.name}</p>
                  <p className="font-bold">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          } */}
        </div>
      </div>
    </div>
  )
}
