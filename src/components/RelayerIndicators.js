import React, { useEffect, useState } from "react";
import { IndicatorCard } from "./IndicatorCard";
import { Contracts, MANAGER_WALLET } from "../constants/network";
import useProvider from "../hooks/useProvider";
import { truncateWallet } from "../utils/wallet";

const relayer = Contracts.TESTNET.relayer;

const calculateProgress = (A, B) => {
  var percDiff = 100 * Math.abs((A - B) / ((A + B) / 2));
  let formatted = percDiff.toFixed(4);
  if (A > B) {
    return formatted * -1;
  } else {
    return formatted;
  }
};
export const RelayerIndicators = () => {
  const { getWalletBalance } = useProvider();
  const [relayerBalance, setWalletBalance] = useState(0);
  const [balanceProgress, setBalanceProgress] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (relayerBalance === 0) {
        const balance = await getWalletBalance(relayer);
        console.log(balance);
        setWalletBalance(balance);
      }
    };

    fetchData();
  }, [getWalletBalance]);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-xl md:text-3xl uppercase">
        Gas Station Indicators
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <IndicatorCard
          Title={<div>Gas Station Balance</div>}
          Content={<div>{relayerBalance} FTM</div>}
        />
      </div>
    </div>
  );
};
