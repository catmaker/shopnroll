"use client";

import React from "react";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";

const CartList = () => {
  const { items, removeAll } = useCart();
  console.log(items);
  return (
    <>
      <div className="mt-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-full">
            {items.length === 0 && <NoResults />}
          </div>
          {items.map((item) => (
            <article key={item.product.id}>
              <ProductCard
                key={item.product.id}
                product={item.product}
                subCategories={[]}
              />
            </article>
          ))}
        </section>
        {items.length > 0 && (
          <div className="flex justify-end">
            <Button
              className="border border-gray-200 p-2 font-thin mt-4 rounded-md hover:bg-gray-100"
              onClick={() => {
                removeAll();
              }}
            >
              All Remove
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartList;
