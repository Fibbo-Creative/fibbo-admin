import { Accordion, Avatar, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { AcceptVerifyModal } from "../components/AcceptVerifyModal";
import { PendingVerification } from "../components/PendingVerification";

export const Artists = () => {
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
        <div className="text-3xl uppercase"> Verify Requests </div>
        {pendingRequests?.length > 0 ? (
          <Accordion className="flex flex-col ">
            {pendingRequests?.map((item) => {
              return (
                <PendingVerification
                  key={item._id}
                  item={item}
                  openAcceptModal={() => handleOpenModal(item)}
                  openDeclineModal={() => handleOpenDeclineModal(item)}
                />
              );
            })}
          </Accordion>
        ) : (
          <div>No Pending Suggestions</div>
        )}
      </div>
      <div className="flex flex-col gap-3 lg:mx-10 my-5 p-4 w-full">
        <div className="text-3xl uppercase"> Verified Artists </div>
        <div className="flex flex-wrap gap-4">
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
      <AcceptVerifyModal
        showModal={showModal}
        item={detailRequest}
        decline={decline}
        handleClose={handleCloseModal}
      />
    </div>
  );
};
