import { Accordion, Avatar, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { PendingVerification } from "../components/PendingVerification";
import marketplaceApi from "../context/axios";

export const Artists = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [verifiedArtists, setVerifiedArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pending = await marketplaceApi.get("verify/allRequests");

      setPendingRequests(pending.data);

      const verified = await marketplaceApi.get("users/verified");
      console.log(verified.data);
      setVerifiedArtists(verified.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col gap-3 mx-10 my-5 p-4 w-full">
        <div className="text-3xl uppercase"> Verify Requests </div>
        {pendingRequests?.length > 0 ? (
          <Accordion className="flex flex-col ">
            {pendingRequests?.map((item) => {
              return <PendingVerification key={item._id} item={item} />;
            })}
          </Accordion>
        ) : (
          <div>No Pending Suggestions</div>
        )}
      </div>
      <div className="flex flex-col gap-3 mx-10 my-5 p-4 w-full">
        <div className="text-3xl uppercase"> Verified Artists </div>
        {verifiedArtists.map((item) => {
          return (
            <Card className="w-fit" key={item._id}>
              <div className="flex items-center gap-3">
                <Avatar img={item.profileImg} />
                <div> {item.username}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
