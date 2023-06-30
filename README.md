# DeDeal: Decentralized Escrow Protocol for Exchanging Crypto and Off-chain Value

## What is DeDeal?

DeDeal is a decentralized escrow protocol for the exchange of crypto and off-chain value without any third-party Intermediaries through self-governed sanctioning.

Normal deals using off-chain values, such as fiat or physical goods, require trust through a centralized third party, such as a corporation or state (or mafia). Such a third party ensures the enforceability of the contract by sanctioning the players who fail to fulfill the contract.

DeDeal makes contracts enforceable without third parties by allowing players to sanction each other. This frees deals from centralized control and eliminates fees and censorship.

## “Ownership” as a Force to Sanction
The concept of "ownership" has long been an important element of the economy, and it often leads to conflict.

In a law-abiding society with a functioning state and police force, "ownership" is guaranteed by a social consensus that, "if your ownership is violated by someone, the centralized power will sanction that person."

On the other hand, primordial "ownership" is simply established as a signal of “attack the enemy that violates your ‘ownership”, as in the case of territorial behaviors exhibited by animals.

DeDeal establishes an exchange of "ownership" of goods for the price of the goods before the goods are physically moved, by creating an agreement to sanction in the case of a breach of contract.

## Rule of DeDeal
https://drive.google.com/file/d/1cQJKgRdP0LXEwaMCHRjZb1DuwWXWsI63/view?usp=sharing

## Explorers

- Ethereum Goerli
    - Explorer: https://goerli.etherscan.io/address/0xf97a015281bc52948604d959c13276a84c7b8454
- Polygon Mumbai
    - Explorer: https://mumbai.polygonscan.com/address/0x5435643439c59b76ba15d24a498bb6bf83259e7e
- Scroll Alpha
    - Explorer: https://blockscout.scroll.io/address/0x45d5E14e8b68FdF89dB69620a80BC6b2cfd39e93
- Taiko A2
    - Explorer: https://l2explorer.a2.taiko.xyz/address/0xf97A015281BC52948604d959c13276a84c7B8454/transactions#address-tabs
- Celo Alfajores
    - Explorer: https://explorer.celo.org/alfajores/address/0x7641c294EBd551018C39981a38d14F28fF8E2711/transactions#address-tabs


## Functions

### claim()

The `claim()` function creates a new deal in the contract. It requires the seller to send an amount of Ether as the initial deposit. The function takes two arguments:

- `_grantDeadline`: The number of seconds after which the deposit can be released if not executed.
- `_executeDeadlineInterval`: The interval in seconds that the deposit can be executed.

### grant(uint _dealId)

The `grant()` function allows the buyer to deposit an amount of Ether equal to the seller's deposit, indicating their agreement to the deal. It requires the following argument:

- `_dealId`: The ID of the deal the buyer wants to participate in.

### buyerExecuteSeller(uint _dealId)

The `buyerExecuteSeller()` function allows the buyer to execute the deal by transferring twice the deposit amount. It requires the following argument:

- `_dealId`: The ID of the deal the buyer wants to execute.

### sellerExecuteBuyer(uint _dealId)

The `sellerExecuteBuyer()` function allows the seller to execute the deal by transferring twice the deposit amount. It requires the following argument:

- `_dealId`: The ID of the deal the seller wants to execute.

### releaseDeposits(uint _dealId)

The `releaseDeposits()` function allows the deposits to be released to their respective parties after the deposit release time has passed. It requires the following argument:

- `_dealId`: The ID of the deal for which the deposits should be released.

### getDeal(uint _dealId)

The `getDeal()` function returns the details of a specific deal. It requires the following argument:

- `_dealId`: The ID of the deal to retrieve.

## Events

- `eventDeal`: Triggered when a new deal is created, a buyer participates in a deal, or a deal is executed.
- `eventMsgValue`: Triggered when a new deal is created, showing the initial deposit amount.

## Requirements

The contract has several requirements for input validation:

- The buyer's and seller's deposits must be equal.
- The buyer and seller must transfer exactly twice the deposit amount when executing the deal.
- The deposit release time must not have passed when executing the deal.

## License

This smart contract is released under the MIT License.
# dedeal-aptos
# dedeal-aptos
