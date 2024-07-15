ETH Intermediate Module 2: Smart Crypto Tech Contract Deployment
Overview
This project demonstrates the deployment of a smart contract on the Ethereum blockchain using Hardhat. It includes frontend integration to interact with the deployed contract for depositing and withdrawing ETH, and other functionalities.

Install dependencies:

Copy code
npm install
Open two additional terminals in your VS Code.

Start the local Ethereum network:

Copy code
npx hardhat node
Deploy the smart contract to the local network:

arduino
Copy code
npx hardhat run --network localhost scripts/deploy.js
Launch the frontend:

arduino
Copy code
npm run dev
Open the browser and navigate to http://localhost:3000/.

Connect your MetaMask wallet and perform transactions as required.

Smart Contract Details
Assessment.sol
solidity
Copy code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    address public owner;
    uint public balance;

    event Deposit_eth(uint amount);
    event Withdraw_eth(uint amount);

    constructor() payable {
        owner = msg.sender;
        balance = msg.value;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function deposit(uint amount) public payable {
        require(msg.sender == owner, "Only owner can deposit");
        uint previousBalance = balance;
        balance += amount;
        assert(balance == previousBalance + amount);
        emit Deposit_eth(amount);
    }

    function withdraw(uint amount) public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint previousBalance = balance;
        require(balance >= amount, "Insufficient balance");
        balance -= amount;
        assert(balance == previousBalance - amount);
        emit Withdraw_eth(amount);
    }

    function ownerName() public pure returns (string memory) {
        return "Raman";
    }

    function ownerCity() public pure returns (string memory) {
        return "City";
    }

    function ownerStatus() public pure returns (string memory) {
        return "Active";
    }

    function addition(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
Functionality
Frontend Interface: Upon launching the frontend, you'll see "Welcome to the Metacrafters ATM Transaction and Management System!". Connect your MetaMask wallet to view account details.

Deposit and Withdraw: Click on "Deposit 1 ETH" or "Withdraw 1 ETH" to interact with the contract. MetaMask will prompt you to confirm transactions.

Calculator: Enter two unsigned integers in the calculator and click "Add". The result will be displayed upon refreshing the page.

Frontend Image: (https://github.com/ramanaman12345/eth-intermideate-mod-2/blob/main/frontend%20image)

Author
Author: Raman
