"use client";

import Button from "@/components/ui/button";
import useWishlist from "@/hooks/use-wishlist";
import { Product } from "@/lib/types";
import { Heart } from "lucide-react";

interface ProductActionsProps {
  product: Product;
  selectedColor?: string | null;
  selectedSize?: string | null;
  quantity?: number;
}

const ProductActions = ({
  product,
  selectedColor,
  selectedSize,
  quantity = 1,
}: ProductActionsProps) => {
  const wishlist = useWishlist();
  const isWishlisted = wishlist.items.some(
    (item) => item.product.id === product.id
  );

  const onAddToWishlist = () => {
    if (isWishlisted) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem({
        product,
        selectedColor,
        selectedSize,
        quantity,
      });
    }
  };

  const onBuyNow = () => {
    // 구매 로직 구현
    console.log("Buy now:", {
      product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  return (
    <div className="mt-4 flex items-center gap-2 justify-between">
      <Button
        onClick={onBuyNow}
        disabled={!selectedColor || !selectedSize}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition min-w-[180px]"
      >
        Buy it now
      </Button>
      <Button
        onClick={onAddToWishlist}
        className={`
          px-4 py-2 rounded-md transition min-w-[120px]
          ${
            isWishlisted
              ? "text-red-500 fill-red-500"
              : "text-gray-600 hover:text-red-500"
          }
        `}
      >
        {isWishlisted ? (
          <Heart className="fill-red-500" />
        ) : (
          <Heart strokeWidth={2} />
        )}
      </Button>
    </div>
  );
};

export default ProductActions;
