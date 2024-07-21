import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

function DataCard({ value, label, shouldFormat }: DataCardProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {shouldFormat ? formatPrice(value) : value}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DataCard;
