"use client";

import React from "react";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import usePreviewModal from "@/hooks/use-preview-modal";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const CartSummary = () => {
  const { items: cartItems } = useCart();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = usePreviewModal();
  const searchParams = useSearchParams();
  const { removeAll } = useCart();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  if (cartItems?.length === 0) {
    return null;
  }

  const allItemsSelected = cartItems.every(
    (item) => item.selectedColor && item.selectedSize
  );

  const onCheckout = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
      },
      {
        withCredentials: true,
      }
    );
    window.location.href = res.data.url;
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Summary</h1>
      <div className="mt-4 space-y-4">
        {cartItems?.map((item) => (
          <div key={item.product.id} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <Link href={`/product/${item.product.id}`}>
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </Link>
              <div className="flex-1">
                <Link href={`/product/${item.product.id}`}>
                  <h3 className="font-medium">{item.product.name}</h3>
                </Link>
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p>Price: {item.product.price}원</p>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p
                    className={`${
                      item.selectedColor && item.selectedSize
                        ? "font-medium text-black"
                        : "text-red-500"
                    }`}
                  >
                    {item.selectedColor && item.selectedSize ? (
                      <div className="flex items-center justify-between">
                        <span>{`${item.selectedColor} / ${item.selectedSize}`}</span>
                        <Button
                          onClick={() => {
                            onOpen(item.product);
                          }}
                          className="text-xs bg-gray-100 px-2 py-1 ml-2 rounded-md hover:bg-gray-200"
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          onOpen(item.product);
                        }}
                      >
                        Select
                      </Button>
                    )}
                  </p>
                  {item.selectedColor && item.selectedSize && (
                    <p className="font-medium text-black">
                      Total:
                      {(
                        Number(item.product.price) * (item.quantity || 1)
                      ).toLocaleString()}
                      원
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="border rounded-lg p-4 mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">
              {cartItems
                .reduce(
                  (total, item) =>
                    total + Number(item.product.price) * (item.quantity || 1),
                  0
                )
                .toLocaleString()}
              원
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Shipping</span>
            <span className="font-medium">2,500원</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <span className="font-bold">Total</span>
            <span className="font-bold">
              {cartItems
                .reduce(
                  (total, item) =>
                    total + Number(item.product.price) * (item.quantity || 1),
                  0
                )
                .toLocaleString()}
              원
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col items-end gap-2">
          {!allItemsSelected && (
            <p className="text-red-500 text-sm">
              Please select options for all items before checkout
            </p>
          )}
          <Button
            className={`
              px-4 py-3 rounded-md transition min-w-[180px]
              ${
                !allItemsSelected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 hover:shadow-lg"
              }
              text-white
            `}
            onClick={onCheckout}
            disabled={!allItemsSelected}
          >
            {allItemsSelected ? "Checkout" : "Select All Options"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
