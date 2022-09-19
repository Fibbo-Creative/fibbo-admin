import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { RelayerIndicators } from "../components/RelayerIndicators";

export const GasStation = () => {
  const { getVerificationRequests, getVerificatedArtists } = useApi();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [verifiedArtists, setVerifiedArtists] = useState([]);

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
