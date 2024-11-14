"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";
import { toast } from "react-hot-toast";

const CartList = () => {
  const { items, removeItem, removeAll } = useCart();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get("success")) {
      // 현재 장바구니에 있는 아이템들의 ID를 저장
      const currentItemIds = items.map(item => item.product.id);
      
      // 각 아이템 제거
      currentItemIds.forEach(id => removeItem(id));
      
      toast.success("결제가 완료되었습니다.");
    }
  }, [searchParams, removeItem, items]);

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