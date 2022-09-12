import React from "react";
import { CommunityIndicators } from "../components/CommunityIndicators";
import { GeneralIndicators } from "../components/GeneralIndicators";
import { RelayerIndicators } from "../components/RelayerIndicators";
import { WalletIndicators } from "../components/WalletIndicators";

export const Home = () => {
  return (
    <div>
      {/** WALLET INDICATOR - TOTAL BALANCE - Percentatge up/down */}
      <WalletIndicators />
      <GeneralIndicators />
      <CommunityIndicators />
      <RelayerIndicators />
    </div>
  );
};
