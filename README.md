Write the code and create .sol, deploy.js, and index.js file.

Inside the project directory, in the terminal type:
```npm i```
Logic of the code

Write the license identifier and pragma solidity version.

In the contract Assessment, declare two variables owner and balance of type address and unsigned int respectively.

Create two events Deposit_eth and Withdraw_eth with the amount to be deposited and withdrawn as its parameters.

Declare a payable constructor which initializes the owner as msg.sender and balance set to initial balance.

The getBalance() function is declared pure and view only, which in turn returns the balance of the connected account.

The deposit function is declared payable and public to interact with the metamask and front end. It takes the amount to be deposited as its parameter. The current balance is declared as the previous balance. It uses the require statement to verify that the msg.sender is the real owner. If this condition returns to true then the amount is added to the balance and the new balance is updated using the assert statement. At last, emit the Deposit_eth event.

The withdraw function is declared public and takes the amount to be withdrawn as its parameter. It uses the require statement to verify that the msg.sender is the real owner. The current balance is declared as the previous balance. If the balance is less than the withdrawn amount, the transaction reverts to the insufficient balance custom error. Else if not then the withdrawn amount is deducted from the current balance. The new balance is updated using the assert statement. At last, emit the Withdraw_eth event.

Additionally, there are three more functions named as ownerName(), ownerCity(), and ownerStatus() which are declared as public and pure. They return the name, city, and status of the owner of the account/transaction.

Lastly, we have an addition function that is declared public and pure. It returns the summation of two unsigned integers.

Functionality of the code

Clone the module's repository into the working space of the gitpod.

Make three different terminals. In the first terminal type "npm i" to install the project dependencies. In the second terminal, type "npx hardhat node" which provides the accounts and private keys. In the third terminal, type "npm run dev" to start the front end at the localhost port 3000.

Open the site. There we encounter the frontend user interface with the heading "Welcome to the Metacrafters ATM Transaction and Management System!".Also, we find the "connect to the metamask wallet". Click on it. There we find the account, balance of the account, name, city, and status of the current owner.

Below it, click the deposit 1 eth or the withdraw 1 eth. There we get a notification from the metamask to confirm the transaction.

Also there is a Calculator for Mathematics. It requires two unsigned integers. After entering, click on add button, and refresh the page, we get the addition of the two unsigned integers.

With this, the project is successfully completed satisfying all the conditions.

Image of the Frontend
()
Open two additional terminals in your VS code

In the second terminal type: ```npx hardhat node```

now in  third terminal, type: ```npx hardhat run --network localhost scripts/deploy.js```

Again in the first terminal, type ```npm run dev``` , this will launch it in the front-end.

Now click on localhost link shown in the terminal 
Typically at http://localhost:3000/
connect metamask wallet and perform the tasks.

This was all about this project.
