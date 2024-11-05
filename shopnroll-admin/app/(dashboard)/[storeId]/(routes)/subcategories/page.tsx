import React from "react";
import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { SubCategoryColumn } from "./components/columns";
import { format } from "date-fns";

const SubCategoriesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.subCategory.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    }, // 데이터 조회 시 빌보드 데이터도 함께 조회
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSubCategories: SubCategoryColumn[] = categories.map(
    (item) => ({
      id: item.id,
      name: item.name,
      categoryName: item.category.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedSubCategories} />
      </div>
    </div>
  );
};

export default SubCategoriesPage;
