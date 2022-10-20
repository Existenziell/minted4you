
import { ethers } from 'ethers'
import { useState } from 'react'
import { events } from '../../../lib/events'
import { minted4YouNftAddress } from '../../../config'
import Minted4YouNFT from '../../../artifacts/contracts/Minted4YouNFT.sol/Minted4YouNFT.json'
import Image from 'next/image'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const Event = ({ ticket, event }) => {

  const [minting, setMinting] = useState(false)
  const [mintingSuccess, setMintingSuccess] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [txHash, setTxHash] = useState('')
  const [feedback, setFeedback] = useState('')
  const [networkInfo, setNetworkInfo] = useState('')

  const chainId = 3 // (Local:1337 | Mumbai: 80001 | Ropsten:3 | Rinkeby: 4)
  // const router = useRouter()
  console.log(minted4YouNftAddress);
  async function mint() {
    setMinting(true)
    // Check Network again
    // const network = await Provider.getNetwork()

    // if (network.chainId === chainId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
    const contract = new ethers.Contract(minted4YouNftAddress, Minted4YouNFT.abi, signer)
    const address = await signer.getAddress()
    const transaction = await contract.mint(address, mintAmount)

    await transaction.wait()
      .then((receipt) => {
        setMintingSuccess(true)
        setMinting(false)
        setFeedback('Congratulations, that was successful')
        setTxHash(receipt.transactionHash)
      })
    // } else {
    //   setNetworkInfo('Please change network to Polygon in Metamask.')
    // }
  }

  const checkMintAmount = (amount) => {
    if (amount >= 1 && amount <= 20) {
      setMintAmount(amount)
    }
  }

  return (
    <div className="px-4 pb-16 mt-16">
      <h1 className="text-2xl md:text-4xl mb-16">Minted<span className='text-highlight'>4</span>you</h1>

      <div className='flex flex-col md:flex-row md:items-start md:gap-8'>
        <Image src={`/events/${ticket.image}.png`} alt={`Ticket-${ticket.image}`} width={576} height={1024} />

        <div className='bg-brand-dark bg-opacity-60 backdrop-blur-sm text-left w-full md:w-1/2'>
          <div className='flex flex-col justify-evenly h-full my-8 md:my-0'>

            <h2 className='text-4xl'>{event.name}</h2>
            <p className='mb-4'>{event.country}</p>
            <h3 className='text-2xl'>{ticket.name}</h3>
            <div className='rounded-sm border border-highlight flex items-center gap-2 px-3 py-1 w-max my-4'>
              <img src='/icons/ticket.svg' />
              <span>Ticket</span>
            </div>

            <p className='text-gray-400 mt-8'>LOCATION:</p>
            <p className='text-xl'>{event.location}</p>
            <p className='text-gray-400 mt-4'>SECTION:</p>
            <p className='text-lg'>{ticket.section}</p>
            <p className='text-gray-400 mt-4'>DATE:</p>
            <p className='text-lg'>{event.date[0]} - {event.date[1]}, {event.date[2]}</p>

            <hr className='my-8' />
            <p className='text-gray-400 mb-2'>PRICE</p>
            <p className='text-4xl'>${ticket.price}</p>

            <div className='inline-flex flex-col items-center justify-center w-8'>
              <svg onClick={() => checkMintAmount(mintAmount + 1)} xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 cursor-pointer text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
              </svg>
              <input type='number' min='1' max={20} value={mintAmount} readOnly onChange={() => { }} className='pl-4 text-4xl text-center text-brand dark:bg-gray-800' />
              <svg onClick={() => checkMintAmount(mintAmount - 1)} xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 cursor-pointer text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
            {(!mintingSuccess && !minting) &&
              <button className='button mt-8 mb-4 w-full' onClick={mint}>Buy</button>
            }
          </div>
        </div>
      </div>

      {minting &&
        <div className='flex flex-col items-center justify-center mb-8 flex-grow'>
          <ClimbingBoxLoader color={'white'} loading={minting} size={40} />
          <p className='mt-20 font-mono text-center text-lg'>Minting in progress...<br />Waiting for Network confirmation.</p>
          <p className='font-mono'>{networkInfo}</p>
        </div>
      }

      {mintingSuccess &&
        <div className='text-center'>
          <p className='text-white text-4xl leading-snug'>{feedback}</p>
          <p className='font-mono mt-8'>Transaction hash: (click to verify)<br /><a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>{txHash}</a></p>
        </div>
      }
      <div className='my-8 border border-highlight rounded-sm p-4'>{event.desc}</div>
    </div>
  )
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug
  const temporary = slug.split('-')[0]
  let event
  temporary === 'blockdown' ?
    event = events[0] :
    event = events[1]

  const tickets = events.map(e => {
    return (e.tickets)
  })
  let ticket = tickets.flat().filter((t) => (t.slug === slug))[0]
  ticket = JSON.parse(JSON.stringify(ticket))

  return {
    props: { ticket, event }
  }
}

export async function getStaticPaths() {
  const tickets = events.map(e => (e.tickets)).flat()
  const paths = tickets.map(t => {
    return ({
      params: { slug: t.slug },
    })
  })
  return { paths, fallback: false }
}

export default Event
