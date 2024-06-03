import { useState, useCallback, useEffect } from "react";
import "./pages.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as splToken from "@solana/spl-token";
import { TOKEN_DECIMAL, TOKEN_PUBKEY } from "../constants";
import useAirdrop from "../hooks/useAirdrop.js";
import { Icon, IconType } from "../components/icons";
import { Divider } from "@mui/material";
import { numberWithCommas } from "../utils";

const Claim = () => {
  const { claimToken, transactionPending, buyAmount, claimedAmount } = useAirdrop();

  return (
    <div className="w-full flex flex-col items-center mt-[160px]">
      <div className="w-full md:w-[503px] flex flex-col">
        <div className="font-normal text-[32px] md:text-[52px] leading-[62.4px] tracking-tight">
          Claim your <span className="text-cyan-400">$CDBD</span>
        </div>
        <div className="text-base tracking-tight mt-4">Claim your $CDBD tokens today and unlock exclusive benefits soon.</div>
      </div>
      <div className="w-full md:w-[550px] border border-solid border-cyan-400 p-6 rounded-3xl flex flex-col mt-6">
        <div className="flex flex-col">
          <p>Your claimable amount</p>
          <div className="w-full h-0 border border-[#0a220b] mt-6" />
          <div className="h-[34px] flex flex-row items-center justify-center mt-6">
            <img src="/assets/icon/ic_cdbd.svg" width={"34px"} />
            <div className="text-2xl ml-2">{numberWithCommas(Number((buyAmount - claimedAmount) / 10 ** TOKEN_DECIMAL).toFixed(2))}</div>
          </div>
        </div>
        {transactionPending ? (
          <div className="flex flex-row items-center justify-center mt-6">
            <Icon type={IconType.LOADING} className="w-14 h-14" />
          </div>
        ) : (
          <button className="h-[36px] rounded-2xl bg-cyan-400 font-medium mt-6" onClick={claimToken}>
            Claim now
          </button>
        )}
      </div>
    </div>
  );
};

export default Claim;
