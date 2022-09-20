import React, { useEffect, useState } from "react";
import { IndicatorCard } from "./IndicatorCard";
import { Contracts, MANAGER_WALLET } from "../constants/network";
import useProvider from "../hooks/useProvider";
import { truncateWallet } from "../utils/wallet";
import { useApi } from "../api";

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
  const { getOldGasStationBalance } = useApi();

  const [relayerBalance, setWalletBalance] = useState(0);
  const [balanceProgress, setBalanceProgress] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (relayerBalance === 0) {
        const balance = await getWalletBalance(relayer);
        const oldBalance = await getOldGasStationBalance();
        setWalletBalance(balance);
        setBalanceProgress(
          calculateProgress(oldBalance.balance, parseFloat(balance))
        );
      }
    };

    fetchData();
  }, [getWalletBalance]);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-xl md:text-3xl uppercase">Indicadores Estación</div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <IndicatorCard
          Title={<div>Balance Estación</div>}
          Content={<div>{relayerBalance} FTM</div>}
        />
        <IndicatorCard
          Title={<div>Progreso</div>}
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
