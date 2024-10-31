import React from "react";
import { Product } from "@/lib/types";
import Currency from "@/components/ui/currency";

interface InfoProps {
  product: Product;
}

const Info = ({ product }: InfoProps) => {
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">
          <Currency value={product.price} />
        </p>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

export default Info;
