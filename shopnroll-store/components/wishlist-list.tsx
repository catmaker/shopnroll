"use client";

import React from "react";
import useWishlist from "@/hooks/use-wishlist";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

const WishlistList = () => {
  const { items } = useWishlist();
  console.log(items);
  return (
    <div className="mt-12">
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard
            key={item.product.id}
            product={item.product}
            subCategories={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistList;
