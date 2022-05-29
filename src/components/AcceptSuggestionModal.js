import { Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import marketplaceApi from "../context/axios";

export const AcceptSuggestionModal = ({
  showModal,
  decline,
  item,
  handleClose,
}) => {
  const [suggestionValue, setSuggestionValue] = useState(0.0);
  const validateAndAdd = async () => {
    const response = await marketplaceApi.post("suggestions/accept", {
      title: item.title,
      proposer: item.proposer,
      value: suggestionValue.toString(),
    });

    window.location.reload();
  };

  const declineAndRemove = async () => {
    const response = await marketplaceApi.post("suggestions/decline", {
      title: item.title,
      proposer: item.proposer,
    });

    window.location.reload();
  };
  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Accept Suggestion
          </h3>
          <div className="flex gap-2">
            <div className="font-bold">Title:</div>
            <div className="italic">{item?.title}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Description:</div>
            <div className="italic">{item?.description}</div>
          </div>
          <div>
            Please, put the value that this suggestion will cost to implement
          </div>
          <div>
            {!decline && (
              <TextInput
                value={suggestionValue}
                onChange={(e) => setSuggestionValue(e.target.value)}
                type="number"
                placeholder="Value of the suggestion"
              />
            )}
          </div>
          <div>
            {decline ? (
              <Button
                className="bg-red-600 hover:bg-red-800"
                onClick={declineAndRemove}
              >
                Decline
              </Button>
            ) : (
              <Button onClick={validateAndAdd}>Validate</Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
