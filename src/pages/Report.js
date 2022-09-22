import { Accordion, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useApi } from "../api";
import { DepositModal } from "../components/DepositModal";
import { PendingReport } from "../components/PendingReport";
import { RelayerIndicators } from "../components/RelayerIndicators";

export const Reports = () => {
  const [pendingReports, setPendingReports] = useState([]);

  const [showProcessModal, setShowProcessModal] = useState(false);
  const { getReports } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const reports = await getReports();
      console.log(reports);
      setPendingReports(reports);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-3 my-5 lg:mx-10  p-4 w-full">
        <div className="text-3xl uppercase">Reportes Pendientes</div>

        {pendingReports?.collections?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="text-xl uppercase">Collecciones</div>
            <Accordion className="flex flex-col ">
              {pendingReports?.collections?.map((col) => {
                return <PendingReport></PendingReport>;
              })}
            </Accordion>
          </div>
        ) : (
          <div>No hay reportes en collecciones</div>
        )}

        {pendingReports?.item?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="text-xl uppercase">NFTS</div>
            <Accordion className="flex flex-col ">
              {pendingReports?.item?.map((col) => {
                return <PendingReport></PendingReport>;
              })}
            </Accordion>
          </div>
        ) : (
          <div>No hay reportes en Nfts</div>
        )}

        {pendingReports?.profiles?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="text-xl uppercase">Perfiles</div>
            <Accordion className="flex flex-col ">
              {pendingReports?.profiles?.map((col) => {
                return <PendingReport></PendingReport>;
              })}
            </Accordion>
          </div>
        ) : (
          <div>No hay reportes en Perfiles</div>
        )}
      </div>
      <div className="">
        <div className="text-3xl uppercase">Reportes Pendientes</div>
      </div>
    </div>
  );
};
