import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formmattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formmattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;