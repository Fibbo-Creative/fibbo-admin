import { Accordion, Avatar, Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { AcceptVerifyModal } from "../components/AcceptVerifyModal";
import { PendingVerification } from "../components/PendingVerification";
import { RelayerIndicators } from "../components/RelayerIndicators";

export const GasStation = () => {
  const { getVerificationRequests, getVerificatedArtists } = useApi();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [verifiedArtists, setVerifiedArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailRequest, setDetailRequest] = useState(null);
  const [decline, setDecline] = useState(false);

  const handleOpenModal = (item) => {
    setDetailRequest(item);
    setDecline(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setDetailRequest(null);
    setDecline(false);
    setShowModal(false);
  };

  const handleOpenDeclineModal = (item) => {
    setDetailRequest(item);
    setDecline(true);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pending = await getVerificationRequests();
      console.log(pending);
      setPendingRequests(pending);

      const verified = await getVerificatedArtists();

      setVerifiedArtists(verified);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-3 lg:mx-10  my-5 p-4 w-full">
        <RelayerIndicators />
      </div>
      <div className="flex flex-col gap-3 lg:mx-10 my-5 p-4 w-full">
        <div className="text-xl md:text-3xl uppercase">ACTIONS</div>
        <div className="flex gap-4">
          <Button color="blue">DEPOSIT</Button>
          <Button color="green">WITHDRAW</Button>
        </div>
      </div>
    </div>
  );
};
