import "./layouts.css";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();

  const onWalletConnect = () => {
    if (!publicKey) {
      const installedWallets = wallets.filter((wallet) => wallet.readyState === "Installed");
      if (installedWallets.length <= 0) {
        toast.warning("Phantom wallet is not installed yet.");
        return;
      }
      select(wallets[0].adapter.name);
    } else {
      disconnect();
    }
  };

  return (
    <div className="mx-4 md:mx-[40px] lg:mx-[160px] h-[80px]  flex flex-row gap-2 items-center justify-between z-50">
      <div className="w-[200px] h-10 flex flex-row items-center gap-2.5">
        {/* <img src="/assets/icon/ic_cdbd.svg" /> */}
        <p className="text-xl font-semibold">
          JUP<span className="text-sky-700"> Airdrop</span>
        </p>
      </div>
      <button className="h-9 flex flex-row items-center justify-center rounded-3xl px-4 py-2 text-[12px] bg-cyan-500" onClick={onWalletConnect}>
        {!publicKey ? "Connect Wallet" : publicKey.toBase58().slice(0, 4) + " ... " + publicKey.toBase58().slice(-4)}
      </button>
    </div>
  );
};

export default Navbar;
