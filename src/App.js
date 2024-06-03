import React, { useMemo } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletConnectProvider } from "./providers/WalletConnectProvider";

import Navbar from "./layouts/navbar";
import Claim from "./pages/claim";
import ThemeContext from "./context/themeContext";

import "./App.css";
import SOL from "./assets/img/sol.svg";
import USDC from "./assets/img/usdc.svg";
import USDT from "./assets/img/usdt.png";
import JUP from "./assets/img/jup.svg";
import Copyright from "./pages/copyright";

function App() {
  const tokens = [
    { ft: "SOL", icon: SOL },
    { ft: "JUP", icon: JUP },
    { ft: "USDC", icon: USDC },
    { ft: "USDT", icon: USDT },
  ];
  return (
    <div className="App bg-[#071619] bg-center bg-cover min-h-screen" style={{ backgroundImage: "url('/assets/img/pattern.png')" }}>
      <ThemeContext.Provider value={tokens}>
        <WalletConnectProvider>
          <Navbar></Navbar>
          <div className="px-5 md:px-10 lg:px-0 pt-6 md:pt-[100px] pb-[160px] flex flex-col">
            <Claim />
          </div>
          {/* <Copyright /> */}
          <ToastContainer autoClose={3000} draggableDirection="x" toastStyle={{ backgroundColor: "#05bfc4", color: "white" }} />
        </WalletConnectProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
