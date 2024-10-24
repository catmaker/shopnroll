"use client";

import { BillboardColumn } from "./columns";

interface CellActionProps {
  data: BillboardColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  return <div>Action</div>;
};

export default CellAction;
