"use client";
import Header from "./components/Header";
import { useState,useRef } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

export default function Home() {
  const [isConnectedText, setIsConnectedText] = useState("Connect Wallet");
  const [isConnected, setIsConnected] = useState(false);
  const initialButtonStyle = "btn btn-accent border-2 border-primary";
  const [connectBtnStyle, setConnectBtnStyle] = useState(initialButtonStyle);
  // const [signer, setSigner] = useState();
  const ethAmountRef = useRef<HTMLInputElement>(null);
  // created a reference for the input value

  async function connect() {
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
        // @ts-ignore
        await ethereum.request({ method: "eth_requestAccounts" });
        // @ts-ignore
        let connectedProvider = new ethers.BrowserProvider(window.ethereum);
        // setSigner(connectedProvider.getSigner());
        setIsConnected(true);
        setIsConnectedText("Connected");
        setConnectBtnStyle("btn border-1 border-base-content text-success bg-transparent hover:border-accent hover:bg-none");
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
      setIsConnectedText("Metamask not installed/connected");
      setConnectBtnStyle("btn border-1 border-error text-error bg-transparent hover:border-error hover:bg-none");

    }
  }


  async function fund() {
    const ethAmount = ethAmountRef.current?.value;
    console.log(ethAmount);
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      console.log(`Funding with ${ethAmount}...`);
      // @ts-ignore
      let connectedProvider = new ethers.BrowserProvider(window.ethereum);
      connectedProvider.send("eth_requestAccounts", []);
      const signer = await connectedProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        // @ts-ignore
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
    // @ts-ignore
    if(typeof window.ethereum !== "undefined") {
      // @ts-ignore
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
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      // @ts-ignore
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
          <div className="rounded-[30px] inset-shadow-[0_0_60px_rgba(0,0,0,0.6)] inset-shadow-primary shadow-primary shadow-[0_0_120px_rgba(0,0,0,0.9)]
        gap-10 flex flex-wrap justify-center items-center h-auto pt-20 pb-20 border-primary border-1
        fixed left-1/2 top-1/2 mt-[-80px] transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-2 w-full justify-center">
            <input
                type="number"
                placeholder="ETH Amount"
                className="input border-1 border-primary bg-base-100
                 inset-shadow-[0_0_12px_rgba(0,0,0,0.6)] inset-shadow-primary shadow-primary shadow-[0_0_30px_rgba(0,0,0,0.9)]
                 text-base-content font-bold focus:outline focus:outline-accent"
                ref={ethAmountRef}
            ></input>
            <button className="btn border-accent border-2 bg-transparent text-accent hover:bg-primary hover:text-primary-content" onClick={() => fund()}>
              Fund
            </button>
            </div>
            <button className="btn btn-primary bg-transparent text-primary hover:bg-primary hover:text-primary-content" onClick={() => getBalance()}>
              Get Balance
            </button>
            <button className="btn btn-primary bg-transparent text-primary hover:bg-primary hover:text-primary-content" onClick={() => withdraw()}>
              Withdraw
            </button>
          </div>
        </>
      )}
    </main>
  );
}
