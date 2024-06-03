import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { IDL } from "../idl/airdrop";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  BUYER_HARDCAP,
  BUYER_TOKEN_HARDCAP,
  AIRDROP_AUTHORITY,
  AIRDROP_ID as AIRDROP_ID,
  AIRDROP_PROGRAM_PUBKEY,
  AIRDROP_SEED as AIRDROP_SEED,
  TOKEN_DECIMAL,
  TOKEN_PUBKEY,
  USER_SEED,
  SOL_TOKEN_PUBKEY,
  USDC_TOKEN_PUBKEY,
  USDT_TOKEN_PUBKEY,
  JUP_TOKEN_PUBKEY,
  SOL_PRICEFEED_ID,
  JUP_PRICEFEED_ID,
} from "../constants";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

import { parsePriceData } from "@pythnetwork/client";

export default function useAirdrop() {
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [transactionPending, setTransactionPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [depositedAmount, setDepositedAmount] = useState(0);

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(IDL, AIRDROP_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  // // create airdrop
  // useEffect(() => {
  //   const createAirdrop = async () => {
  //     if (program && publicKey) {
  //       setTransactionPending(true);
  //       const [airdrop_info, airdrop_bump] = await findProgramAddressSync([Buffer.from(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), Uint8Array.from([AIRDROP_ID])], program.programId);
  //       const airdrop_end_timestamp = new Date("2024-09-29").getTime();

  //       const tx = await program.methods
  //         .createAirdrop(
  //           TOKEN_PUBKEY,
  //           new anchor.BN(1000),
  //           new anchor.BN(airdrop_end_timestamp),
  //           AIRDROP_ID // presale id
  //         )
  //         .accounts({
  //           airdropInfo: airdrop_info,
  //           authority: AIRDROP_AUTHORITY,
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //         })
  //         .rpc();
  //     }
  //   };

  //   createAirdrop();
  // }, [publicKey]);

  const createAirdrop = async () => {
    try {
      if (program && publicKey) {
        setTransactionPending(true);
        const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        const airdrop_end_timestamp = new Date("2024-09-29").getTime();
  
        const tx = await program.methods
          .createAirdrop(
            TOKEN_PUBKEY,
            new anchor.BN(1000),
            new anchor.BN(airdrop_end_timestamp),
            AIRDROP_ID // presale id
          )
          .accounts({
            airdropInfo: airdrop_info,
            authority: AIRDROP_AUTHORITY,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .rpc();
      }
    }catch(err){
      console.log(err)
    }
  };

  const depositToken = async (amount) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        const [userInfo, userBump] = findProgramAddressSync([utf8.encode(USER_SEED), AIRDROP_AUTHORITY.toBuffer(), publicKey.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);

        const fromAssociatedTokenAccount = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });

        const toAssociatedTokenAccount = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: airdrop_info,
        });

        // Use BigInt for large number calculations
        const depositAmount = BigInt(amount * 10 ** TOKEN_DECIMAL);

        const tx = await program.methods
          .depositToken(
            new anchor.BN(depositAmount), // deposit amount
            AIRDROP_ID // presale id
          )
          .accounts({
            mintAccount: TOKEN_PUBKEY,
            airdropAuthority: AIRDROP_AUTHORITY,
            fromAssociatedTokenAccount: fromAssociatedTokenAccount,
            toAssociatedTokenAccount: toAssociatedTokenAccount,
            airdropInfo: airdrop_info,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            // userInfo,
          })
          .rpc();
        toast.success("Successfully deposited token.");

        getDepositAmount();

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const claimToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        const [userInfo, userBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);

        const claimer_associated_token_account = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });

        const airdrop_token_associated_token_account = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: airdrop_info,
        });

        const tx = await program.methods
          .claimToken(AIRDROP_ID)
          .accounts({
            mintAccount: TOKEN_PUBKEY,
            airdropAuthority: AIRDROP_AUTHORITY,
            depositedTokenAta: airdrop_token_associated_token_account,
            claimerAta: claimer_associated_token_account,
            userInfo: userInfo,
            airdropInfo: airdrop_info,
            claimer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token claim was successful.");
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawToken = async (amount) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        const [userInfo, userBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);

        const toAssociatedTokenAccount = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });

        const fromAssociatedTokenAccount = await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: airdrop_info,
        });

        // Use BigInt for large number calculations
        const withdrawAmount = BigInt(amount * 10 ** TOKEN_DECIMAL);

        const tx = await program.methods
          .withdrawToken(
            new anchor.BN(withdrawAmount), // withdraw amount
            AIRDROP_ID // airdrop id
          )
          .accounts({
            mintAccount: TOKEN_PUBKEY,
            airdropAuthority: AIRDROP_AUTHORITY,
            fromAssociatedTokenAccount: fromAssociatedTokenAccount,
            toAssociatedTokenAccount: toAssociatedTokenAccount,
            airdropInfo: airdrop_info,
            payer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            // userInfo,
          })
          .rpc();
        toast.success("Token withdraw was successful.");

        getDepositAmount();
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const getClaimedAmount = async () => {
    if (program && publicKey) {
      try {
        // const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        const [userInfo, userBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        let userInfoStorage = await program.account.userInfo.fetchNullable(userInfo);

        if (userInfoStorage) {
          let claimAmount = userInfoStorage.claimAmount.toNumber() / 10 ** TOKEN_DECIMAL;
          setClaimedAmount(claimAmount);
          console.log("Get Claimed Amount : " + claimAmount);
        }

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      }
    }
  };

  const getDepositAmount = async () => {
    if (program && publicKey) {
      try {
        const [airdrop_info, airdrop_bump] = findProgramAddressSync([utf8.encode(AIRDROP_SEED), AIRDROP_AUTHORITY.toBuffer(), new Uint8Array([AIRDROP_ID])], program.programId);
        let airdropInfoStorage = await program.account.airdropInfo.fetchNullable(airdrop_info);

        if (airdropInfoStorage) {
          let depositAmount = airdropInfoStorage.depositTokenAmount.toNumber() / 10 ** TOKEN_DECIMAL;
          setDepositedAmount(depositAmount);
          console.log("Get Deposit Amount : " + depositAmount);
        }

        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      }
    }
  };

  return {
    depositToken,
    createAirdrop,
    claimToken,
    withdrawToken,
    getClaimedAmount,
    getDepositAmount,
    claimedAmount,
    depositedAmount,
    transactionPending,
  };
}
