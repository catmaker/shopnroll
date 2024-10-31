import React from "react";
import SubCategoryForm from "./components/subcategory-form";
import prismadb from "@/lib/prismadb";

const SubCategoryPage = async ({
  params,
}: {
  params: { categoriesId: string; storeId: string };
}) => {
  const subCategory = await prismadb.subCategory.findUnique({
    where: {
      id: params.categoriesId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryForm initialData={subCategory} categories={categories} />
      </div>
    </div>
  );
};

export default SubCategoryPage;
