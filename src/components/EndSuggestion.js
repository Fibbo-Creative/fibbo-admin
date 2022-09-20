import { Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";

export const EndSuggestionModal = ({
  showModal,
  decline,
  item,
  handleClose,
}) => {
  const { saveSuggestion } = useApi();
  const validateAndAdd = async () => {
    await saveSuggestion(item.title, item.proposer.wallet);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Finalizar y Acceptar sugerencia
          </h3>
          <div className="flex gap-2">
            <div className="font-bold">Title:</div>
            <div className="italic">{item?.title}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Description:</div>
            <div className="italic">{item?.description}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-bold">Votos:</div>
            <div className="italic">{item?.votes}</div>
          </div>

          <div></div>
          <div>
            <Button onClick={validateAndAdd}>Acceptar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
