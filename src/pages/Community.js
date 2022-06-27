import { Accordion, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { AcceptSuggestionModal } from "../components/AcceptSuggestionModal";
import { ActiveSuggestion } from "../components/ActiveSuggestion";
import { IndicatorCard } from "../components/IndicatorCard";
import { PendingSuggestion } from "../components/PendingSuggestion";
import { useCommunity } from "../contracts/community";
import useProvider from "../hooks/useProvider";

export const Community = () => {
  const { getSuggestionsInProgress, getContractAddress } = useCommunity();
  const { getWalletBalance } = useProvider();
  const { getPendingSuggestions, getProfileInfo } = useApi();
  const [pendingSuggestions, setPendingSuggestions] = useState([]);
  const [activeSuggestions, setActiveSuggestions] = useState([]);
  const [detailSuggestion, setDetailSuggestion] = useState({});
  const [decline, setDecline] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);
  const [suggestionsContractBalance, setSuggestionsContractBalance] =
    useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (item) => {
    setDetailSuggestion(item);
    setDecline(false);
    setShowModal(true);
  };
  const handleOpenDeclineModal = (item) => {
    setDetailSuggestion(item);
    setDecline(true);
    setShowModal(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const pending = await getPendingSuggestions();

      let formattedPendingSugestions = await Promise.all(
        pending.map(async (item) => {
          const proposer = item.proposer;
          const profileInfo = await getProfileInfo(proposer);
          return {
            ...item,
            proposer: profileInfo,
          };
        })
      );

      setPendingSuggestions(formattedPendingSugestions);

      const active = await getSuggestionsInProgress();

      let formattedActiveSugestions = await Promise.all(
        active.map(async (item) => {
          const proposer = item.proposer;
          const profileInfo = await getProfileInfo(proposer);
          return {
            ...item,
            proposer: profileInfo,
          };
        })
      );
      setActiveSuggestions(formattedActiveSugestions);
      setCountActive(formattedActiveSugestions.length);

      const address = await getContractAddress();
      const contractBalance = await getWalletBalance(address);
      setSuggestionsContractBalance(contractBalance);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-3 lg:mx-10  my-5 p-4 w-full">
        <div className="text-3xl uppercase"> Live Suggestions </div>
        <div className="flex flex-col md:flex-row gap-2">
          <IndicatorCard
            Title={<b>Active Suggestions</b>}
            Content={<div>{countActive}</div>}
          />
          <IndicatorCard
            Title={<b>Total Acumulated</b>}
            Content={<div>{suggestionsContractBalance} FTM</div>}
          />
          <IndicatorCard
            Title={<b>Completed Suggestions</b>}
            Content={<div>{countCompleted}</div>}
          />
        </div>
        {activeSuggestions?.length > 0 ? (
          <Accordion className="flex flex-col ">
            {activeSuggestions?.map((item) => {
              return (
                <ActiveSuggestion
                  key={item.suggestionId}
                  item={item}
                  openAcceptModal={() => handleOpenModal(item)}
                  openDeclineModal={() => handleOpenDeclineModal(item)}
                />
              );
            })}
            <AcceptSuggestionModal
              showModal={showModal}
              item={detailSuggestion}
              decline={decline}
              handleClose={() => setShowModal(false)}
            />
          </Accordion>
        ) : (
          <div>No Active Suggestions</div>
        )}
      </div>
      <div className="flex flex-col gap-3 my-5 lg:mx-10  p-4 w-full">
        <div className="text-3xl uppercase"> Pending Suggestions </div>
        {pendingSuggestions?.length > 0 ? (
          <Accordion className="flex flex-col ">
            {pendingSuggestions?.map((item) => {
              return (
                <PendingSuggestion
                  key={item._id}
                  item={item}
                  openAcceptModal={() => handleOpenModal(item)}
                  openDeclineModal={() => handleOpenDeclineModal(item)}
                />
              );
            })}
            <AcceptSuggestionModal
              showModal={showModal}
              item={detailSuggestion}
              decline={decline}
              handleClose={() => setShowModal(false)}
            />
          </Accordion>
        ) : (
          <div>No Pending Suggestions</div>
        )}
      </div>
    </div>
  );
};
