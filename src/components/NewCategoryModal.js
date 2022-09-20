import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";
import { Icon } from "@iconify/react";

export const NewCategoryModal = ({ showModal, handleClose, onAdd }) => {
  const [engName, setEngName] = useState("");
  const [espName, setEspName] = useState("");

  const [identifier, setIdentified] = useState();
  const [icon, setIcon] = useState("eos-icons:abstract-incomplete");

  const [succes, setSucces] = useState(false);

  const addCategory = async () => {
    await onAdd(engName, espName, identifier, icon);

    setSucces(true);
  };
  return (
    <React.Fragment>
      <Modal show={showModal} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Añadir nueva categoria
          </h3>
          <div>
            Para añadir una nueva categoría debemos introducir los siguientes
            datos:
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            <div className=" flex flex-col  w-full ">
              <div className="mb-2 block">
                <Label htmlFor="engName">Nombre en Inglés</Label>
              </div>
              <TextInput
                value={engName}
                onChange={(e) => setEngName(e.target.value)}
                id="engName"
                placeholder="Abstract Art"
                className="w-full"
                required={true}
                sizing="md"
              />
            </div>
            <div className=" flex flex-col  w-full">
              <div className="mb-2 block">
                <Label htmlFor="espName">Nombre en Español</Label>
              </div>
              <TextInput
                value={espName}
                onChange={(e) => setEspName(e.target.value)}
                id="espName"
                placeholder="Arte Abstracto"
                className="w-full"
                required={true}
                sizing="md"
              />
            </div>

            <div className=" flex flex-col  w-full">
              <div className="mb-2 block">
                <div>
                  <b>Identificador</b>
                </div>
                <div className="text-sm">
                  Este identificador debe ser único!
                </div>
              </div>
              <TextInput
                value={identifier}
                onChange={(e) => setIdentified(e.target.value)}
                id="identifier"
                placeholder="ABSTRACT"
                className="w-full"
                required={true}
                sizing="sm"
              />
            </div>
            <div className="flex flex-col  w-full ">
              <div className="mb-2 block">
                <div>
                  <b>Icono</b>
                </div>
                <div className="text-sm">
                  Este icono debe pertenecer a{" "}
                  <a
                    className="underline text-blue-500"
                    href="https://icon-sets.iconify.design/?query="
                  >
                    iconify.design
                  </a>{" "}
                  para poder ser mostrado en el market
                </div>
              </div>
              <div className="flex gap-2 items-center w-full justify-between">
                <TextInput
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  id="identifier"
                  placeholder="eos-icons:abstract-incomplete"
                  className="w-[225px]"
                  required={true}
                  sizing="sm"
                />
                <div className="border w-[48px] h-[48px]">
                  <Icon icon={icon} width={48} height={48} />
                </div>
              </div>
            </div>
            <Button color={"green"} onClick={(e) => addCategory(e)}>
              Añadir
            </Button>
            {succes && (
              <div className="text-green-600">
                Categoría añadida correctamente
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
