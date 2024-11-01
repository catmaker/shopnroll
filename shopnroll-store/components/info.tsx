import React from "react";
import { Product } from "@/lib/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";

interface InfoProps {
  product: Product;
}

const Info = ({ product }: InfoProps) => {
  return (
    <div className="mt-10 ml-8 px-4 sm:mt-16 sm:px-0 lg:mt-0 flex flex-col gap-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-lg text-gray-500">{product.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <span className="text-[#3f3f3f] tracking-wide text-xl font-thin">
          Price
        </span>
        <Currency
          value={product.price}
          className="text-xl text-black font-thin text-[#3f3f3f]"
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <span className="text-[#3f3f3f] tracking-wide text-xl font-thin">
          Color
        </span>
        <div className="flex items-center gap-2">
          {product.productColors?.length > 0 ? (
            product.productColors.map((pc) => (
              <Button
                key={pc.id}
                className="w-6 h-6 rounded-full border border-gray-200 p-0 hover:opacity-75 transition"
                style={{ backgroundColor: pc.color.value }}
                title={pc.color.name}
                // onClick={() => {}}
              />
            ))
          ) : (
            <Button
              className="w-6 h-6 rounded-full border border-gray-200 p-0 hover:opacity-75 transition"
              style={{ backgroundColor: product.color.value }}
              title={product.color.name}
              // onClick={() => {}}
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 justify-between border-b border-gray-200 pb-4">
        <span className="text-[#3f3f3f] tracking-wide text-xl font-thin">
          Size
        </span>
        <div className="flex items-center gap-2">
          {product.productSizes?.length > 0 ? (
            product.productSizes.map((ps) => (
              <Button
                key={ps.id}
                className="border border-gray-200 p-2 rounded-md hover:bg-gray-100 transition"
                // onClick={() => {}}
              >
                {ps.size.name}
              </Button>
            ))
          ) : (
            <Button
              className="border border-gray-200 p-2 rounded-md hover:bg-gray-100 transition"
              // onClick={() => {}}
            >
              {product.size.name}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 justify-between">
        <Button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition min-w-[180px]">
          Buy it now
        </Button>
        <Button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition min-w-[120px]">
          Wishlist
        </Button>
        <Button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition min-w-[120px]">
          Share
        </Button>
      </div>
    </div>
  );
};

export default Info;
