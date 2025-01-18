"use client";
import Header from "./components/Header";
import { useState,useRef } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

export default function Home() {
  const [isConnectedText, setIsConnectedText] = useState("Connect Wallet");
  const [isConnected, setIsConnected] = useState(false);
  // const [signer, setSigner] = useState();
  const ethAmountRef = useRef<HTMLInputElement>(null);
  // created a reference for the input value

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        let connectedProvider = new ethers.BrowserProvider(window.ethereum);
        // setSigner(connectedProvider.getSigner());
        setIsConnected(true);
        setIsConnectedText("Connected");
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
      setIsConnectedText("Metamask not installed/connected");
    }
  }


  async function fund() {
    const ethAmount = ethAmountRef.current?.value;
    console.log(ethAmount);
    if (typeof window.ethereum !== "undefined") {
      console.log(`Funding with ${ethAmount}...`);
      let connectedProvider = new ethers.BrowserProvider(window.ethereum);
      connectedProvider.send("eth_requestAccounts", []);
      const signer = await connectedProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transaction = await contract.fund({value: ethers.parseEther(ethAmount)});
        await transaction.wait(1);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnectedText("Metamask not installed/connected");
    }
  }

  async function withdraw() {
    if(typeof window.ethereum !== "undefined") {
      let connectedProvider = new ethers.BrowserProvider(window.ethereum);
      connectedProvider.send("eth_requestAccounts", []);
      const signer = await connectedProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transaction = await contract.withdraw();
        await transaction.wait(1);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnectedText("Metamask not installed/connected");
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      let connectedProvider = new ethers.BrowserProvider(window.ethereum);
      try {
        await connectedProvider.send("eth_requestAccounts", []);
        const balance = await connectedProvider.getBalance(contractAddress);
        console.log(ethers.formatEther(balance));
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <main>
      <div>
        <Header />
      </div>
      <button className="btn" onClick={() => connect()}>
        {isConnectedText}
      </button>
      {isConnected && (
        <>
          <button className="btn" onClick={() => getBalance()}>
            Get Balance
          </button>
          <input
            type="number"
            placeholder="ETH Amount"
            className="input input-bordered"
            ref={ethAmountRef}
          ></input>
          <button className="btn" onClick={() => fund()}>
            Fund
          </button>
          <button className="btn" onClick={() => withdraw()}>Withdraw</button>
        </>
      )}
    </main>
  );
}
