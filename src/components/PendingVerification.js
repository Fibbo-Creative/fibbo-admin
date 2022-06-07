import { Accordion, Avatar, Button } from "flowbite-react";
import React from "react";
import { truncateWallet } from "../utils/wallet";
export const PendingVerification = ({
  key,
  item,
  openAcceptModal,
  openDeclineModal,
}) => {
  return (
    <Accordion.Panel className="">
      <Accordion.Title arrowIcon={undefined}>
        <div className="flex items-center gap-5">
          <Avatar img={item.profileData.profileImg} />
          <div>{item.profileData.username}</div>
          <div>{truncateWallet(item.profileData.wallet)}</div>
        </div>
      </Accordion.Title>
      <Accordion.Content>
        <div className="border-b mb-5 flex flex-col gap-3">
          <div className="flex flex-col border-b pb-2">
            <div className="flex gap-4">
              <div className="text-gray-500">Nombre</div>
              <div>{item.requestData.name}</div>
            </div>
            <div className="flex gap-4">
              <div className="text-gray-500">Apellido</div>
              <div>{item.requestData.lastName}</div>
            </div>
          </div>

          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {item.requestData.description}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-8">
            <Button onClick={openAcceptModal} className="items-end">
              Accept Request
            </Button>
            <Button
              color="red"
              onClick={openDeclineModal}
              className="bg-red-600 hover:bg-red-800"
            >
              Decline Request
            </Button>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  );
};
