DeDeal:Decentrized Escrow for Off-Chain Deals without Any Third Party

DeDeal is a smart contract that allows secure deposits for deals between two parties, the seller and the buyer. The contract ensures that both parties deposit an agreed amount of crypto, and it holds the deposits until the deal is executed or the deposit release time has passed.

Functions
claim()
The claim() function creates a new deal in the contract. It requires the seller to send an amount of crypto as the initial deposit. The function takes two arguments:

_grantDeadline: The number of seconds after which the deposit can be released if not executed.
_executeDeadlineInterval: The interval in seconds that the deposit can be executed.
grant(uint _dealId)
The grant() function allows the buyer to deposit an amount of crypto equal to the seller's deposit, indicating their agreement to the deal. It requires the following argument:

_dealId: The ID of the deal the buyer wants to participate in.
buyerExecuteSeller(uint _dealId)
The buyerExecuteSeller() function allows the buyer to execute the deal by transferring twice the deposit amount. It requires the following argument:

_dealId: The ID of the deal the buyer wants to execute.
sellerExecuteBuyer(uint _dealId)
The sellerExecuteBuyer() function allows the seller to execute the deal by transferring twice the deposit amount. It requires the following argument:

_dealId: The ID of the deal the seller wants to execute.
releaseDeposits(uint _dealId)
The releaseDeposits() function allows the deposits to be released to their respective parties after the deposit release time has passed. It requires the following argument:

_dealId: The ID of the deal for which the deposits should be released.
getDeal(uint _dealId)
The getDeal() function returns the details of a specific deal. It requires the following argument:

_dealId: The ID of the deal to retrieve.
Events
eventDeal: Triggered when a new deal is created, a buyer participates in a deal, or a deal is executed.
eventMsgValue: Triggered when a new deal is created, showing the initial deposit amount.
Requirements
The contract has several requirements for input validation:

The buyer's and seller's deposits must be equal.
The buyer and seller must transfer exactly twice the deposit amount when executing the deal.
The deposit release time must not have passed when executing the deal.
License
This smart contract is released under the MIT License.