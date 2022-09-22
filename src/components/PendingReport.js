import { Accordion, Button } from "flowbite-react";
import React from "react";

export const PendingReport = ({
  key,
  item,
  openAcceptModal,
  openDeclineModal,
}) => {
  return (
    <Accordion.Panel className="">
      <Accordion.Title arrowIcon={undefined}>
        <div className="flex flex-col gap-5 w-full"></div>
      </Accordion.Title>
      <Accordion.Content>
        <div className="flex flex-col items-end">
          <div className="flex gap-8">
            <Button onClick={openAcceptModal} className="items-end">
              Accept Report
            </Button>
            <Button
              color="red"
              onClick={openDeclineModal}
              className="bg-red-600 hover:bg-red-800"
            >
              Decline Report
            </Button>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  );
};
