import React from "react";
import { IndicatorCard } from "../components/IndicatorCard";

export const GeneralIndicators = () => {
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
