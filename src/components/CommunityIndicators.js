import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { IndicatorCard } from "../components/IndicatorCard";
import { useCommunity } from "../contracts/community";

export const CommunityIndicators = () => {
  const [liveSuggestions, setLiveSuggestions] = useState(0);
  const [pendingSuggestions, setPendingSuggestions] = useState(0);
  const [pendingArtists, setPendingArtists] = useState(0);
  const { getSuggestionsInProgress, getContractAddress } = useCommunity();

  const { getVerificationRequests, getPendingSuggestions } = useApi();
  useEffect(() => {
    const fetchData = async () => {
      //Get Nfts for sale
      const pending = await getSuggestionsInProgress();
      setLiveSuggestions(pending.length);

      //Get Number of Transfers
      const pendingSugg = await getPendingSuggestions();
      setPendingSuggestions(pendingSugg.length);

      //Get Number of Wallets
      const artists = await getVerificationRequests();
      setPendingArtists(artists.length);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-xl md:text-3xl uppercase">Community Indicators</div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        {/** Number of NFTs created */}
        <IndicatorCard
          Title={<div>Suggestions Live</div>}
          Content={<div>{liveSuggestions}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Suggestions</div>}
          Content={<div>{pendingSuggestions}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Verify Artists</div>}
          Content={<div>{pendingArtists}</div>}
        />
      </div>
    </div>
  );
};
