# Festival Marketplace

### Overview

An end-to-end blockchain based platform for festival ticket booking and ticket reselling between trustless parties. This will help to eliminate the current issue with the fake tickets and uncontrolled resale price for the tickets in black market. The platform is build on public Ethereum blockchain network where ERC721 tokens represent festival tickets and these tickets can be purchased using a platform based ERC20 token called FEST.

### Functionality

1. An organiser can create a new fest for ticket distribution with specified ticket price and the total supply of tickets for the sale.
2. Once the festival is hosted on the platform, the customers have ablility to purchase the tickets directly from the organiser.
3. The customer can view the tickets they own for the available festival.
4. The customer have ability to sell the tickets they own either via the secondary market or directly to the peer customer, but the price at which customer can sell the ticket can not be more than 110% of the purchase price.
5. Tickets being sold through the secondary market adds a commission of 10% to the organiser which is deducted from the selling price the seller has listed.

### Technical Details

##### Smart Contract

Mainly 4 contracts listed under `./contracts` directory.

1. **FestToken** -
   1. A contract for ERC20 token called FEST which is used to purchase tickets.
2. **FestivalNFT** -
   1. A contract for ERC721 tokens to represent festival tickets.
   2. The owner of the contract will also have minter role and only the owner can mint new tickets.
3. **FestivalMarketplace** -
   1. A contract which acts as a marketplace for purchasing tickets from organiser and through secondary market.
   2. This contract will act as a delegate approver for the FEST token as well as NFT token transfers.
4. **FestivalTicketsFactory** -
   1. A contract which implements a factory pattern with FestivalNFT contract to create new festivals on the fly.

#### How it works?

###### Creating new festival

1. The organiser creates a new festival by minting tickets using `bulkMintTickets()` of `FestivalNFT` smart contract. The minted tickets are assigned to `FestivalMarketplace` smart contract.

###### Purchase tickets from organiser

1. When customer initiates purchase from organiser, the application first sets the ticket price as the allowance of `FestivalMarketplace` contract for the customer's FEST tokens.
2. Then the application initiates the `purchaseTicket()` of `FestivalMarketplace` contract which transfers the FEST tokens from customer to the organiser and then transfers the next sale ticket from `FestivalMarketplace` contract to the customer.

###### Selling tickets on secondary market

1. When customer wish to list ticket for sale on secondary market of the platform, the application initiates the `setSaleDetails()` of `FestivalNFT` contract which gives permission to `FestivalMarketplace` contract to transfer ticket token to the customer who will be purchasing the ticket.

###### Purchasing tickets from secondary market

1. When customer initiates purchase from secondary market, the application first sets the ticket selling price as the allowance of `FestivalMarketplace` contract for the customer's FEST tokens.
2. Then the applicaiton initiates the `secondaryPurchase()` of `FestivalMarketplace` contract which transfers the 10% commission as FEST tokens from customer to the organiser and rest amount to the seller and transfers the ticket token from seller to buyer.

###### Selling tickets peer to peer

1. When customer wish to sell the ticket directly to another customer, the customer has to initiates `secondaryTransferTicket()` of `FestivalNFT` contract which restricts the customer from transfering ticket if the selling price is higher than 110%.

### Running this project

1. Start the local Hardhat node

```sh
npx hardhat node
```

2. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the app

```
npm run dev
```
