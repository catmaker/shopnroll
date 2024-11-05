"use client";
import React, { useState } from "react";
import { Product } from "@/lib/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import ProductActions from "@/components/product-actions";

interface InfoProps {
  product: Product;
}

const Info = ({ product }: InfoProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

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
          className="text-xl text-black font-thin"
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
                onClick={() => setSelectedColor(pc.color.name)}
              />
            ))
          ) : (
            <Button
              className="w-6 h-6 rounded-full border border-gray-200 p-0 hover:opacity-75 transition"
              style={{ backgroundColor: product.color.value }}
              title={product.color.name}
              onClick={() => setSelectedColor(product.color.name)}
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
                onClick={() => setSelectedSize(ps.size.name)}
              >
                {ps.size.name}
              </Button>
            ))
          ) : (
            <Button
              className="border border-gray-200 p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setSelectedSize(product.size.name)}
            >
              {product.size.name}
            </Button>
          )}
        </div>
      </div>

      {(selectedColor || selectedSize) && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md flex flex-col gap-2">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {selectedColor && (
                <span className="text-gray-600">{selectedColor}</span>
              )}
              {selectedSize && (
                <span className="text-gray-600">{selectedSize}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50"
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                onClick={() => handleQuantityChange("increase")}
                className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50"
              >
                +
              </Button>
            </div>
          </div>
          <div className="px-4 pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <Currency
                value={Number(product.price) * quantity}
                className="text-lg font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 justify-between">
        <ProductActions
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default Info;
