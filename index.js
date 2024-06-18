import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account is found like this");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("**-- Connect your Metamask wallet by clicking here --**");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async (walletaddress) => {
    if (atm) {
      alert(walletaddress)
      setBalance((await atm.getBalanceFromWalletAddress(walletaddress)).toNumber());
    }
  };

  const deposit = async () => {
    alert(account)
    if (atm) {
      let tx = await atm.depositamount(1, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdrawamount(1, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };
 

  const initUser = () => {
    // Check if user has Metamask
    if (!ethWallet) {
      return <p>You need to install Metamask in order to use this ATM.</p>;
    }

    // Check if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance(account[0]);
    }

    return (
      <div class="overlay">
        <p>Your Balance: {balance}</p>
        <p>Your Account: {account}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={async () => {
          alert((await atm.getBalanceFromWalletAddress(prompt("Wallet Address: "))).toNumber())
        }}>Check Others Balance</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>WELCOME TO MY ATM ** Crypto-Tech **</h1>
        <p>What do you want to do here:</p>
        <p>please select your options:-</p>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
            background-color: beige;
            background-size: cover;
            color:beige ;
            font-family: "Times New Roman", serif;
            border: 1px solid black;
            border-radius: 20px;
            background-image: url("https://i.pinimg.com/originals/75/fc/f7/75fcf7bf71f9ce460132470527a44a73.jpg");
            height: 700px;
            width: 1500px;
            opacity: 0.9;
            font-weight: 900
          }

          header {
            padding: 120px;
          }

          h1 {
            font-family: "Arial", serif;
            font-size: 70px;
            margin-bottom: 20px;
            font-weight: 700
          }

          p {
            font-size: 22px;
            margin-bottom: 20px;
            font-weight: 700
          }

          button {
            background-color: #4caf50;
            color: #fff;
            border: none;
            padding: 20px 30px;
            font-size: 20px;
            cursor: pointer;
          }

          button:hover {
            cursor: pointer;
          }
        `}
      </style>
      
    </main>
  );
}
