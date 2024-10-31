"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { SubCategoryColumn, columns } from "./columns";
import { useRouter, useParams } from "next/navigation";

interface CategoriesClientProps {
  data: SubCategoryColumn[];
}

const CategoriesClient = ({ data }: CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Sub Categories"
          description="Manage sub categories for your store"
        />
        <Button
          size="sm"
          onClick={() => router.push(`/${params.storeId}/subcategories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Sub Categories" />
      <Separator />
      <ApiList entityName="subcategories" entityIdName="subCategoryId" />
    </>
  );
};

export default CategoriesClient;
