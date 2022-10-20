import { ethers } from 'ethers'

const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const accountAddress = await signer.getAddress()

      resolve(accountAddress)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
export default connect
