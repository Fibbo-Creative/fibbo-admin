import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";
import { Icon } from "@iconify/react";
import { useStateContext } from "../context/StateProvider";

export const DepositModal = ({ showModal, handleClose }) => {
  const [value, setValue] = useState(0);
  const [{ authToken }] = useStateContext();
  const { depositToGasStation } = useApi();

  const [succes, setSucces] = useState(false);

  const depositIntoStation = async () => {
    await depositToGasStation(authToken, value);
  };
  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Depositar a Gas Station
          </h3>

          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col  w-full ">
              <div className="mb-2 block">
                <div>
                  <b>Cantidad</b>
                </div>
                <TextInput
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
            <Button color={"green"} onClick={(e) => depositIntoStation(e)}>
              Depositar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
