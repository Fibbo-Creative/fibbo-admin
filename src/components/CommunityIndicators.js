import React, { useEffect, useState } from "react";
import { IndicatorCard } from "../components/IndicatorCard";
import useProvider from "../hooks/useProvider";

const calculateProgress = (A, B) => {
  var percDiff = 100 * Math.abs((A - B) / ((A + B) / 2));
  let formatted = percDiff.toFixed(4);
  if (A > B) {
    return formatted * -1;
  } else {
    return formatted;
  }
};

export const CommunityIndicators = () => {
  return (
    <div className="flex flex-col gap-3 mx-10 my-5 p-4">
      <div className="text-3xl uppercase"> Community Indicators </div>
      <div className="flex gap-10">
        {/** Number of NFTs created */}
        <IndicatorCard
          Title={<div>Suggestions Live</div>}
          Content={<div>{3}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Suggestions</div>}
          Content={<div>{10}</div>}
        />
        <IndicatorCard
          Title={<div>Pending Verify Artists</div>}
          Content={<div>5</div>}
        />
      </div>
    </div>
  );
};
