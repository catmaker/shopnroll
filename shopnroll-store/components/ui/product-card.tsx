"use client";

import React from "react";
import { Product, SubCategory as SubCategoryType } from "@/lib/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import SubCategory from "@/components/ui/sub-category";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  subCategories: SubCategoryType[];
}
const ProductCard = ({ product, subCategories }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };
  const subCategory = subCategories.find(
    (subCategory) => subCategory.id === product.subCategory.id
  );

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product?.images?.[0]?.url}
          alt={product.name}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton icon={<Expand size={20} className="text-gray-600" />} />
            <IconButton
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div className="relative p-2 flex flex-col justify-between">
        <p className="font-semibold text-lg">{product.name}</p>
        <div className="flex items-center justify-between mt-4">
          <Currency value={product?.price} />
          {subCategory && <SubCategory subCategory={subCategory} />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
