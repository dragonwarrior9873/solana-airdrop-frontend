import { useState, useCallback, useEffect } from "react";
import "./pages.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as splToken from "@solana/spl-token";
import { AIRDROP_AUTHORITY, TOKEN_DECIMAL, TOKEN_PUBKEY } from "../constants";
import useAirdrop from "../hooks/useAirdrop.js";
import { Divider } from "@mui/material";
import { numberWithCommas } from "../utils";
import { Icon, IconType } from "../components/icons";
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils/index.js";

const Claim = () => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState(0);

  const { createAirdrop, depositToken, withdrawToken, claimToken, getClaimedAmount, getDepositAmount, claimedAmount, depositedAmount, transactionPending } = useAirdrop();

  const onDepositToken = async (amount) => {
    await depositToken(amount);
  };

  const onWithdrawToken = async (amount) => {
    await withdrawToken(amount);
  };

  const onChangeAmount = async (e) => {
    setAmount(e.target.value);

    console.log(amount);
  };

  useEffect(() => {
    getClaimedAmount();
    getDepositAmount();
  }, [publicKey]);

  return (
    <div className="w-full flex flex-col items-center mt-[100px]">
      <div className="w-full md:w-[503px] flex flex-col">
        <div className="font-normal text-[32px] md:text-[52px] leading-[62.4px] tracking-tight">
          Claim <span className="text-cyan-400">$JUP</span>
        </div>
        <div className="text-xl tracking-tight mt-4">Claim $JUP tokens today and unlock exclusive benefits soon.</div>
      </div>
      <div className="w-full md:w-[550px] border border-solid border-cyan-400 p-6 rounded-3xl flex flex-col mt-6">
        {publicKey && publicKey.toBase58() == AIRDROP_AUTHORITY.toBase58() ? (
          <div className="flex flex-col">
            <div className="flex flex-row w-full gap-2 justify-center items-center">
              <p className="text-2xl font-extrabold">Current Deposit Amount : {depositedAmount} $JUP</p>
            </div>
            <div className="flex flex-row w-full gap-2 justify-between items-center">
              <input
                placeholder=""
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                value={amount}
                onChange={onChangeAmount}
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Amount
              </label>
              <button className="h-[40px] rounded-lg p-2 bg-cyan-400" onClick={() => onDepositToken(amount)}>
                Deposit
              </button>
              <button className="h-[40px] rounded-lg p-2 bg-cyan-400" onClick={async() => await createAirdrop()}>
                CreateAirDrop
              </button>
              <button className="h-[40px] rounded-lg p-2 bg-cyan-400" onClick={() => onWithdrawToken(amount)}>
                Withdraw
              </button>
            </div>
            <div className="w-full h-0 border border-[#0a220b] mt-6" />
          </div>
        ) : (
          ""
        )}
        {transactionPending ? (
          <div className="flex flex-row items-center justify-center mt-6">
            <Icon type={IconType.LOADING} className="w-14 h-14" />
          </div>
        ) : (
          <button className="h-[80px] rounded-2xl bg-cyan-400 text-3xl font-extrabold mt-6" onClick={claimToken} disabled={claimedAmount != 0}>
            {claimedAmount == 0 ? "Claim now" : "You've already claimed " + claimedAmount + "$JUP"}
          </button>
        )}
      </div>

      <div className="w-full md:w-[503px] flex flex-col">
        <div className="text-xl tracking-tight mt-4">Airdrop will be claimable until 31st July 2024, 03:00 PM UTC, there is no rush to claim.</div>
      </div>
    </div>
  );
};

export default Claim;
