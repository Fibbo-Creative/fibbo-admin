import { Accordion, Button, Progress } from "flowbite-react";
import React from "react";

const calculatePercentatge = (numA, numB) => {
  return (numA / numB) * 100;
};

export const ActiveSuggestion = ({ key, item }) => {
  return (
    <Accordion.Panel className="">
      <Accordion.Title arrowIcon={undefined}>
        <div className="flex flex-col justify-evenly">
          <b>{item.title}</b>
        </div>
      </Accordion.Title>
      <Accordion.Content>
        <div className="border-b mb-5">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        </div>
        <div className="mb-5">
          <i className="text-green-400">
            {item.progress} / {item.totalAmount} FTM
          </i>
          <Progress
            progress={calculatePercentatge(item.progress, item.totalAmount)}
            size="lg"
            color="green"
          />
        </div>
        <div className="flex flex-col items-end border-t-2 ">
          <div className="flex gap-8 mt-2">
            <Button>Process Suggestion</Button>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  );
};
