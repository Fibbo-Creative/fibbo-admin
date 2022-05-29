import { Accordion, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AcceptSuggestionModal } from "../components/AcceptSuggestionModal";
import { ActiveSuggestion } from "../components/ActiveSuggestion";
import { IndicatorCard } from "../components/IndicatorCard";
import { PendingSuggestion } from "../components/PendingSuggestion";
import marketplaceApi from "../context/axios";
import {
  getNumberOfSuggestionsActive,
  getSuggestionsActive,
  getSuggestionsContractBalance,
} from "../context/ethersUtils";

export const Community = () => {
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
      const pending = await marketplaceApi.get(
        "suggestions/pendingSuggestions"
      );
      setPendingSuggestions(pending.data);

      const active = await getSuggestionsActive();
      setActiveSuggestions(active);

      const count = await getNumberOfSuggestionsActive();
      setCountActive(count);

      const contractBalance = await getSuggestionsContractBalance();
      setSuggestionsContractBalance(contractBalance);
    };
    fetchData();
  }, []);
  return (
    <div className="flex">
      <div className="flex flex-col gap-3 mx-10 my-5 p-4 w-full">
        <div className="text-3xl uppercase"> Live Suggestions </div>
        <div className="flex gap-2">
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
      <div className="flex flex-col gap-3 mx-10 my-5 p-4 w-full">
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
