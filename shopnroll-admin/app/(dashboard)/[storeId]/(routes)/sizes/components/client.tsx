"use client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import { SizeColumn, columns } from "./columns";
import { useRouter, useParams } from "next/navigation";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient = ({ data }: SizesClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Sizes"
          description="Manage sizes for your store"
        />
        <Button
          size="sm"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizesClient;
