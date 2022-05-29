import React, { useEffect, useState } from "react";
import { IndicatorCard } from "../components/IndicatorCard";
import { MANAGER_WALLET } from "../context/constants";
import {
  calculateProgress,
  getWalletBalance,
  truncateWallet,
} from "../context/ethersUtils";

export const GeneralIndicators = () => {
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
      <div className="text-3xl uppercase"> Market Indicators </div>
      <div className="flex gap-10">
        {/** Number of NFTs created */}
        <IndicatorCard
          Title={<div>NFTs On Sale</div>}
          Content={<div>{24}</div>}
        />
        <IndicatorCard
          Title={<div>Number of Transfers</div>}
          Content={<div>{150}</div>}
        />
        <IndicatorCard
          Title={<div>Number of Wallets</div>}
          Content={<div>78</div>}
        />
      </div>
    </div>
  );
};
