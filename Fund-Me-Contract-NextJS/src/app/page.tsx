"use client";
import Header from "./components/Header";
import { useState,useRef } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

export default function Home() {
  const [isConnectedText, setIsConnectedText] = useState("Connect Wallet");
  const [isConnected, setIsConnected] = useState(false);
  const initialButtonStyle = "btn btn-primary border-2 border-primary";
  const [connectBtnStyle, setConnectBtnStyle] = useState(initialButtonStyle);
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
        setConnectBtnStyle("btn border-2 border-primary text-secondary bg-opacity-0 hover:border-primary hover:bg-opacity-10 hover:bg-secondary");
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
      setIsConnectedText("Metamask not installed/connected");
      setConnectBtnStyle("btn border-2 border-primary text-red-400 bg-opacity-0 hover:border-primary bg-opacity-10 bg-secondary");

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
      <div className="top mt-5 ml-11">
      <button className={connectBtnStyle} onClick={() => connect()}>
        {isConnectedText}
      </button>
      </div>
      {isConnected && (
        <>
          <div className="rounded-xl inset-shadow-sm inset-shadow-red-500 shadow-primary shadow-xl
        gap-10 flex flex-wrap justify-center items-center h-auto pt-20 pb-20
        fixed left-1/2 top-1/2 mt-[-80px] transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-2 w-full justify-center">
            <input
                type="number"
                placeholder="ETH Amount"
                className="input input-bordered"
                ref={ethAmountRef}
            ></input>
            <button className="btn" onClick={() => fund()}>
              Fund
            </button>
            </div>
            <button className="btn" onClick={() => getBalance()}>
              Get Balance
            </button>
            <button className="btn" onClick={() => withdraw()}>
              Withdraw
            </button>
          </div>
        </>
      )}
    </main>
  );
}
