"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address;

      if (!address) return "No address";

      try {
        const parsedAddress = JSON.parse(address);
        return (
          <div className="flex flex-col gap-0.5">
            <div className="text-base">
              {parsedAddress.line1}
              {parsedAddress.line2 && `, ${parsedAddress.line2}`}
            </div>
            <div className="text-sm text-muted-foreground">
              {parsedAddress.city}, {parsedAddress.state}{" "}
              {parsedAddress.postal_code}
            </div>
          </div>
        );
      } catch (error) {
        return address;
      }
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
