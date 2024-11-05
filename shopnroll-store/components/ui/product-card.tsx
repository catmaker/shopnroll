"use client";

import React, { MouseEventHandler } from "react";
import { Product, SubCategory as SubCategoryType } from "@/lib/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart, Heart, X } from "lucide-react";
import Currency from "@/components/ui/currency";
import SubCategory from "@/components/ui/sub-category";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import useWishlist from "@/hooks/use-wishlist";
import { usePathname } from "next/navigation";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  subCategories: SubCategoryType[];
}

const ProductCard = ({ product, subCategories }: ProductCardProps) => {
  const pathname = usePathname();
  const wishlist = useWishlist();
  const cart = useCart();
  const isWishlisted = wishlist.items.some(
    (item) => item.product.id === product.id
  );
  const isCarted = cart.items.some((item) => item.product.id === product.id);
  const wishlistItems = wishlist.items;
  const cartItems = cart.items;
  const router = useRouter();
  const previewModal = usePreviewModal();
  const isWishlistPage = pathname === "/wishlist";
  const isCartPage = pathname === "/cart";

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const subCategory = subCategories.find(
    (subCategory) => subCategory.id === product.subCategory.id
  );

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(product);
  };

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
        {isWishlisted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              wishlist.removeItem(product.id);
            }}
            className="absolute right-2 top-2 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              icon={
                <ShoppingCart
                  size={20}
                  className={`
                    transition-all duration-300 ease-in-out
                    ${
                      isCarted
                        ? "text-blue-500 fill-blue-500"
                        : "fill-none text-gray-600 hover:text-blue-500"
                    }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    isCarted
                      ? cart.removeItem(product.id)
                      : cart.addItem({
                          product,
                          addedAt: Date.now(),
                        });
                  }}
                />
              }
            />
            <IconButton
              icon={
                <Heart
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    isWishlisted
                      ? wishlist.removeItem(product.id)
                      : wishlist.addItem({
                          product,
                          quantity: 1,
                        });
                  }}
                  className={`
                    transition-all duration-300 ease-in-out
                    ${
                      isWishlisted
                        ? "text-red-500 fill-red-500"
                        : "fill-none text-gray-600 hover:text-red-500"
                    }
                  `}
                />
              }
            />
          </div>
        </div>
      </div>
      <div className="relative p-2 flex flex-col justify-between">
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm mt-2">
          {subCategory && <SubCategory subCategory={subCategory} />}
        </p>

        {/* 위시리스트 페이지일 때 */}
        {isWishlistPage && (
          <div className="flex flex-col gap-2 mt-4">
            {wishlistItems
              .filter((item) => item.product.id === product.id)
              .map((item) => (
                <div
                  key={item.product.id}
                  className="text-sm text-gray-500 flex flex-col"
                >
                  {item.selectedColor && (
                    <span className="mr-2">Color: {item.selectedColor}</span>
                  )}
                  {item.selectedSize && (
                    <span className="mr-2">Size: {item.selectedSize}</span>
                  )}
                  {item.quantity && <span>Quantity: {item.quantity}</span>}
                </div>
              ))}
          </div>
        )}

        {/* 카트 페이지일 때 */}
        {isCartPage && (
          <div className="flex flex-col gap-2 mt-4">
            {cartItems
              .filter((item) => item.product.id === product.id)
              .map((item) => (
                <div
                  key={item.product.id}
                  className="text-sm text-gray-500 flex flex-col"
                >
                  {item.selectedColor && (
                    <span className="mr-2">Color: {item.selectedColor}</span>
                  )}
                  {item.selectedSize && (
                    <span className="mr-2">Size: {item.selectedSize}</span>
                  )}
                  {item.quantity && <span>Quantity: {item.quantity}</span>}
                </div>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <Currency value={product?.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
