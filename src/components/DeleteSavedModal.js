import { Button, Checkbox, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";

export const DeleteSavedModal = ({ showModal, item, handleClose }) => {
  const { deleteSavedSuggestion } = useApi();
  const deleteSuggestion = async () => {
    console.log(secure, item);
    if (secure) {
      await deleteSavedSuggestion(item.title, item.proposer.wallet);
      window.location.reload();
    }
  };

  const [secure, setSecure] = useState(false);

  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Eliminar suggerencia
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
            <div className="text-sm">
              Estas seguro de haver tenido en cuenta esta sugerencia?
            </div>
            <Checkbox checked={secure} onChange={() => setSecure(!secure)} />
          </div>

          <div></div>
          <div>
            <Button
              className={`${
                secure ? "cursor-pointer" : "cursor-not-allowed hover:none"
              }`}
              color={secure ? "red" : "alternative"}
              onClick={deleteSuggestion}
            >
              Eliminar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
