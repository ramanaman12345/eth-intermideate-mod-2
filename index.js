import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/ramanAssessment.sol/ramanAssessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ownerName,setOwnerName] = useState("Raman");
  const [ownerCity, setOwnerCity] = useState("Chandigarh University");
  const [ownerStatus, setOwnerStatus] = useState("Eligible Owner");
  const [add,setAdd]=useState(9);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
  const checkOwnerName = async () => {
    if (atm) {
      let ownerName = await atm.checkOwnerName();
      setOwnerName("Raman");
    }
  }

  const checkOwnerCity = async () => {
    if (atm) {
      let ownerCity = await atm.checkOwnerCity();
      setOwnerCity("Chandigarh University");
    }
  }


  const checkOwnerStatus = async () => {
    if (atm) {
      let ownerStatus = await atm.checkOwnerStatus();
      setOwnerStatus("Eligible Owner");
    }
  }
  const addition = async () => {
    if (atm) {
      const a = parseInt(inputA);
      const b = parseInt(inputB);
      const result = await atm.addition(a,b);
      setAdd(result);
    }
}  
const handleInputAChange = (event) => {
  setInputA(event.target.value);
};

const handleInputBChange = (event) => {
  setInputB(event.target.value);
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
        <p style={{ fontFamily: "Sans-serif" }}>Owner Name: {ownerName}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Owner City: {ownerCity}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Owner Status: {ownerStatus}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={async () => {
          alert((await atm.getBalanceFromWalletAddress(prompt("Wallet Address: "))).toNumber())
        }}>Check Others Balance</button>
        <h2>Calculator for Mathematics</h2>
          <p style={{ fontFamily: "Sans-serif" }}>Add: {add ? add.toString() : ""}</p>

          <input
            type="number"
            placeholder="Enter the value of first variable A: "
            value={inputA}
            onChange={handleInputAChange} 
            />
          <input
            type="number"
            placeholder="Enter the value of the second variable B: "
            value={inputB}
            onChange={handleInputBChange} 
            />

          <button style={{ backgroundColor: "yellow" }} onClick={addition}>
            Add
          </button>
      </div>
      
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>WELCOME TO MY ATM ** CRYPTO TECH **</h1>
        <p>Let's Crypto Tech</p>
        <p>please select your Service :-</p>
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
            height: 900px;
            width: 1500px;
            opacity: 0.9;
            font-weight: 950
          }

          header {
            padding: 120px;
          }

          h1 {
            font-family: "Arial", serif;
            font-size: 60px;
            margin-bottom: 20px;
            font-weight: 700
          }

          p {
            font-size: 22px;
            margin-bottom: 20px;
            font-weight: 1000
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
