import React from "react";
import prismadb from "@/lib/prismadb";
import DashboardClient from "./components/client";

interface DashboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  const totalRevenue = await prismadb.order.aggregate({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    _sum: {
      totalPrice: true,
    },
  });
  return <DashboardClient totalRevenue={totalRevenue} />;
};

export default DashboardPage;
