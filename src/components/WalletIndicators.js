import React, { useEffect, useState } from "react";
import { IndicatorCard } from "../components/IndicatorCard";
import { MANAGER_WALLET } from "../constants/network";
import { useWFTMContract } from "../contracts/wftm";
import useProvider from "../hooks/useProvider";
import { truncateWallet } from "../utils/wallet";

const calculateProgress = (A, B) => {
  var percDiff = 100 * Math.abs((A - B) / ((A + B) / 2));
  let formatted = percDiff.toFixed(4);
  if (A > B) {
    return formatted * -1;
  } else {
    return formatted;
  }
};
export const WalletIndicators = () => {
  const { getWalletBalance } = useProvider();
  const { getWFTMBalance } = useWFTMContract();
  const [walletBalance, setWalletBalance] = useState(0);
  const [wftmBalance, setWftmBalance] = useState(0);

  const [balanceProgress, setBalanceProgress] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (walletBalance === 0) {
        const balance = await getWalletBalance(MANAGER_WALLET);
        const _wftmBalance = await getWFTMBalance(MANAGER_WALLET);
        setWalletBalance(balance);
        setWftmBalance(_wftmBalance);
        setBalanceProgress(calculateProgress(2, parseFloat(balance)));
      }
    };

    fetchData();
  }, [getWalletBalance]);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-xl md:text-3xl uppercase"> Wallet Indicators </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <IndicatorCard
          Title={<div>Address</div>}
          Content={<div>{truncateWallet(MANAGER_WALLET)}</div>}
        />
        <IndicatorCard
          Title={<div>Balance</div>}
          Content={
            <div className="flex flex-col">
              <div>{walletBalance} FTM</div>
              <div>{wftmBalance} wFTM</div>
            </div>
          }
        />
        <IndicatorCard
          Title={<div>Progress</div>}
          Content={
            <div
              className={`${
                balanceProgress > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {balanceProgress}%
            </div>
          }
        />
      </div>
    </div>
  );
};
