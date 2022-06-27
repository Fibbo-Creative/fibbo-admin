import { Accordion, Button } from "flowbite-react";
import React from "react";

export const PendingSuggestion = ({
  key,
  item,
  openAcceptModal,
  openDeclineModal,
}) => {
  return (
    <Accordion.Panel className="">
      <Accordion.Title arrowIcon={undefined}>
        <div className="flex flex-col gap-5 w-full">
          <b>{item.title}</b>
        </div>
      </Accordion.Title>
      <Accordion.Content>
        <div className=" flex flex-col gap-5 border-b mb-5">
          <div className="flex gap-5  items-center border-b pb-2">
            <i className="text-sm">Propuesto por</i>
            <div className="flex border items-center gap-2 p-2 rounded-xl">
              <img
                width={32}
                src={item.proposer.profileImg}
                className="rounded-full"
                alt={`${item.proposer.username}-img`}
              />
              {item.proposer.username}
            </div>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-8">
            <Button onClick={openAcceptModal} className="items-end">
              Accept Suggestion
            </Button>
            <Button
              color="red"
              onClick={openDeclineModal}
              className="bg-red-600 hover:bg-red-800"
            >
              Decline Suggestion
            </Button>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  );
};
