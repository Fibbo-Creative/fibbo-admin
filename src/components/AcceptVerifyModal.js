import { Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";
import emailjs from "@emailjs/browser";

emailjs.init("A9IZio99Pk7PWQVes");

export const AcceptVerifyModal = ({
  showModal,
  decline,
  item,
  handleClose,
}) => {
  const { acceptVerificationRequest, declineVerificationRequest } = useApi();
  const validateAndAdd = async () => {
    await acceptVerificationRequest(item.requestData.proposer);
    await emailjs.send("service_20e5sep", "template_jffjyfb", {
      to: item.requestData.email,
    });
    window.location.reload();
  };

  const declineAndRemove = async () => {
    await declineVerificationRequest(item.requestData.proposer);
    await emailjs.send("service_20e5sep", "template_jffjyfb", {
      to: item.requestData.email,
    });
    window.location.reload();
  };
  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {decline ? "Decline Request " : "Accept Request"}
          </h3>
          <div className="flex gap-2">
            <div className="font-bold">Nombre:</div>
            <div className="italic">{item?.requestData.name}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-bold">Apellido:</div>
            <div className="italic">{item?.requestData.lastName}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold">Descripcion:</div>
            <div className="italic">{item?.requestData.description}</div>
          </div>

          <div>
            {decline ? (
              <Button
                color="red"
                className="bg-red-600 hover:bg-red-800"
                onClick={declineAndRemove}
              >
                Declinar
              </Button>
            ) : (
              <Button onClick={validateAndAdd}>Validar</Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
