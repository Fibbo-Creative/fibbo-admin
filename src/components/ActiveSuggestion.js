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
        <div className="mb-5">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        </div>
        <div className="mb-2">Votes {item.votes}</div>
        <div className="flex flex-col border-t-2 ">
          <div className="flex justify-between items-center gap-8 mt-2">
            <div className="flex gap-5  items-center">
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
            <Button>Finalizar</Button>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Panel>
  );
};
