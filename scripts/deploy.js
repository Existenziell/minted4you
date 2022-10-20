const hre = require("hardhat")
const fs = require('fs')

async function main() {

  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  const Minted4YouNFT = await ethers.getContractFactory("Minted4YouNFT")
  const nft = await Minted4YouNFT.deploy('Minted4You NFT', 'M4Y', 'https://minted4you.vercel.app/api/')
  await nft.deployed()
  console.log("Minted4YouNFT deployed to:", nft.address)

  // const FestToken = await ethers.getContractFactory("FestToken")
  // const festToken = await FestToken.deploy()
  // await festToken.deployed()
  // console.log("FestToken deployed to:", festToken.address)

  // const FestivalTicketsFactory = await ethers.getContractFactory("FestivalTicketsFactory")
  // const festivalTicketsFactory = await FestivalTicketsFactory.deploy()
  // await festivalTicketsFactory.deployed()
  // console.log("FestivalTicketsFactory deployed to:", festivalTicketsFactory.address)

  // const FestivalNFT = await ethers.getContractFactory("FestivalNFT")
  // const festivalNft = await FestivalNFT.deploy('Wonderland', 'WLN', 0.1, 10000, `${festivalTicketsFactory.address}`)
  // await festivalNft.deployed()
  // console.log("FestivalNFT deployed to:", festivalNft.address)

  // const FestivalMarketplace = await ethers.getContractFactory("FestivalMarketplace")
  // const festivalMarketplace = await FestivalMarketplace.deploy(festToken.address, festivalNft.address)
  // await festivalMarketplace.deployed()
  // console.log("FestivalMarketplace deployed to:", festivalMarketplace.address)

  // let config = `
  // export const festTokenAddress = "${festToken.address}"
  // export const festivalTicketsFactoryAddress = "${festivalTicketsFactory.address}"
  // export const festivalNFTAddress = "${festivalNft.address}"
  // export const festivalMarketplaceAddress = "${festivalMarketplace.address}"
  // `


  let config = `
  export const minted4YouNftAddress = "${nft.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
