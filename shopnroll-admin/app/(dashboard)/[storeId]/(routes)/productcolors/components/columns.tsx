"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";

export type ProductColorColumn = {
  id: string;
  productId: string;
  productName: string;
  colors: Array<{ id: string; name: string; value: string }>;
  createdAt: string;
};

export const columns: ColumnDef<ProductColorColumn>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.colors.map((color) => (
          <div key={color.id} className="flex items-center gap-1">
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: color.value }}
            />
            <span>{color.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
