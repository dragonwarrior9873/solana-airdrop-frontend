import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import { config } from "../config";

export const WalletConnectProvider = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  // const network = config.isMainnet ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Mainnet) {
      return config.isMainnet ? config.mainNetRpcUrl : config.devNetRpcUrl;
      // return 'https://ultra-quick-frost.solana-mainnet.quiknode.pro/37bcbcb0976ff9f271aaf13e3bee2452de366636/'
    }

    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
