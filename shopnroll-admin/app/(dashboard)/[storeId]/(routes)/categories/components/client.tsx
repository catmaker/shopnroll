"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { CategoryColumn, columns } from "./columns";
import { useRouter, useParams } from "next/navigation";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient = ({ data }: CategoriesClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage categories for your store"
        />
        <Button
          size="sm"
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoriesClient;
