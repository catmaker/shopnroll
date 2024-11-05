"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
interface ProductColorClientProps {
  data: ProductColorColumn[];
}

const ProductColorClient = ({ data }: ProductColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product Colors (${data.length})`}
          description="Manage product colors for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="productName" columns={columns} data={data} />
    </>
  );
};

export default ProductColorClient;
