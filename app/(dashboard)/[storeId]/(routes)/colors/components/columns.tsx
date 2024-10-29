"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
// row는 현재 행의 데이터를 가지고 있음
export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: row.original.value }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
