import { Card } from "flowbite-react";
import React from "react";

export const IndicatorCard = ({ Title, Content }) => {
  return (
    <Card className="max-w-sm">
      {Title}
      {Content}
    </Card>
  );
};
