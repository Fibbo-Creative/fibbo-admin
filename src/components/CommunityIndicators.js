import React, { useEffect, useState } from "react";
import { IndicatorCard } from "../components/IndicatorCard";
import { MANAGER_WALLET } from "../context/constants";
import {
  calculateProgress,
  getWalletBalance,
  truncateWallet,
} from "../context/ethersUtils";

export const CommunityIndicators = () => {
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
      <div className="text-3xl uppercase"> Community Indicators </div>
      <div className="flex gap-10">
        {/** Number of NFTs created */}
        <IndicatorCard
          Title={<div>Suggestions Live</div>}
          Content={<div>{3}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Suggestions</div>}
          Content={<div>{10}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Verify Artists</div>}
          Content={<div>5</div>}
        />
      </div>
    </div>
  );
};
