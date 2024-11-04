"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Button from "@/components/ui/button";
import useWishlist from "@/hooks/use-wishlist";
import { useRouter } from "next/navigation";

const NavActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const wishlist = useWishlist();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center">
      <Button className="relative flex items-center gap-x-4">
        <div className="flex items-center">
          <Heart
            strokeWidth={2}
            onClick={() => router.push("/wishlist")}
            className={`${
              wishlist.items.length > 0
                ? "text-red-500 fill-red-500"
                : "text-gray-600"
            }`}
          />
          <span className="text-sm font-medium">{wishlist.items.length}</span>
        </div>
        <div className="flex items-center">
          <ShoppingCart strokeWidth={2} />
          <span className="ml-1 text-sm font-medium">0</span>
        </div>
      </Button>
    </div>
  );
};

export default NavActions;
