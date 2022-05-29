import React, { useEffect, useState } from "react";
import { IndicatorCard } from "../components/IndicatorCard";
import { MANAGER_WALLET } from "../context/constants";
import {
  calculateProgress,
  getWalletBalance,
  truncateWallet,
} from "../context/ethersUtils";

export const WalletIndicators = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [balanceProgress, setBalanceProgress] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const balance = await getWalletBalance();
      setWalletBalance(balance);
      setBalanceProgress(calculateProgress(2, parseFloat(balance)));
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-3xl uppercase"> Wallet Indicators </div>
      <div className="flex gap-10">
        <IndicatorCard
          Title={<div>Address</div>}
          Content={<div>{truncateWallet(MANAGER_WALLET)}</div>}
        />
        <IndicatorCard
          Title={<div>Balance</div>}
          Content={<div>{walletBalance}</div>}
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
