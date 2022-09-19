import { Accordion, Avatar, Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { AcceptVerifyModal } from "../components/AcceptVerifyModal";
import { PendingVerification } from "../components/PendingVerification";
import { RelayerIndicators } from "../components/RelayerIndicators";
import { Icon } from "@iconify/react";
import { NewCategoryModal } from "../components/NewCategoryModal";

export const Market = () => {
  const { getAllCategories, addNewCategory } = useApi();
  const [categories, setCategories] = useState([]);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  const handleOpenModal = () => {
    setShowNewCategoryModal(true);
  };

  const handleCloseModal = () => {
    setShowNewCategoryModal(false);
  };

  const addCategory = async (engName, espName, identifier, icon) => {
    await addNewCategory(engName, espName, identifier, icon);

    const doc = {
      name: {
        eng: engName,
        esp: espName,
      },
      icon: icon,
      identifier: identifier,
    };

    console.log(doc);
    setCategories([...categories, doc]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pending = await getAllCategories();
      setCategories(pending);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3 lg:mx-10 my-5 p-4 w-full">
          <div className="text-3xl uppercase"> Item Categories </div>
          <div className="flex flex-wrap gap-4 items-center">
            {categories.map((item) => {
              return (
                <Card className="w-fit" key={item._id}>
                  <div className="flex items-center gap-3">
                    <Icon icon={item.icon} />
                    <div> {item.name.eng}</div>
                  </div>
                </Card>
              );
            })}
            <Button color="green" onClick={handleOpenModal}>
              Add New
            </Button>
          </div>
        </div>
        <NewCategoryModal
          onAdd={addCategory}
          showModal={showNewCategoryModal}
          handleClose={handleCloseModal}
        />
      </div>
    </div>
  );
};
