import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "@/components/DataCard";
import { Chart } from "@/components/Chart";

async function AnalyticsPage() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalSales} label="Total Sales" />
        <DataCard
          shouldFormat={true}
          value={totalRevenue}
          label="Total Revenue"
        />
      </div>
      <Chart data={data} />
    </div>
  );
}

export default AnalyticsPage;
