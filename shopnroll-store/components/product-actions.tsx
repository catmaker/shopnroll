"use client";

import Button from "@/components/ui/button";
import useWishlist from "@/hooks/use-wishlist";
import useCart from "@/hooks/use-cart";
import { Product } from "@/lib/types";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";

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
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();
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
    cart.addItem({
      product,
      selectedColor,
      selectedSize,
      quantity,
      addedAt: Date.now(),
    });
    previewModal.onClose();
    router.push("/cart");
  };

  return (
    <div className="mt-4 flex items-center gap-2 justify-between">
      <Button
        onClick={onBuyNow}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:shadow-lg transition min-w-[180px]"
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
