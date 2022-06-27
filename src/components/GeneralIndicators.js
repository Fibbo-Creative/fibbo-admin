import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { IndicatorCard } from "../components/IndicatorCard";

export const GeneralIndicators = () => {
  const [nftsForSaleCounter, setNftsForSaleCounter] = useState(0);
  const [transfersCount, setTransfersCount] = useState(0);
  const [walletsCount, setWalletCounts] = useState(0);

  const { getNftsForSale, getAllTransfers, getAllProfiles } = useApi();
  useEffect(() => {
    const fetchData = async () => {
      //Get Nfts for sale
      const nftsForSale = await getNftsForSale();
      setNftsForSaleCounter(nftsForSale.length);

      //Get Number of Transfers
      const allTransfers = await getAllTransfers();
      setTransfersCount(parseInt(allTransfers));

      //Get Number of Wallets
      const allProfiles = await getAllProfiles();
      setWalletCounts(allProfiles.length);
    };
    fetchData();
  }, [getNftsForSale]);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-xl md:text-3xl uppercase"> Market Indicators </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        {/** Number of NFTs created */}
        <IndicatorCard
          Title={<div>NFTs On Sale</div>}
          Content={<div>{nftsForSaleCounter}</div>}
        />
        <IndicatorCard
          Title={<div>Number of Transfers</div>}
          Content={<div>{transfersCount}</div>}
        />
        <IndicatorCard
          Title={<div>Number of Wallets</div>}
          Content={<div>{walletsCount}</div>}
        />
      </div>
    </div>
  );
};
