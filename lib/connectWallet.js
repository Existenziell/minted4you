import { ethers } from 'ethers'

export async function connectWallet() {

  const chainId = 3 // (Local:1337 | Mumbai: 80001 | Ropsten:3 | Rinkeby: 4)

  // Check MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

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

  return provider
}
