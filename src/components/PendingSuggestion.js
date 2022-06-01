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
      <Accordion.Title arrowIcon={undefined}>{item.title}</Accordion.Title>
      <Accordion.Content>
        <div className="border-b mb-5">
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
