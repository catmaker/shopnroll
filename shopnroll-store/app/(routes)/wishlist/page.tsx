import React from "react";
import Container from "@/components/ui/container";
import WishlistList from "@/components/wishlist-list";

const WishlistPage = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 mt-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Wishlist</h1>
            <p className="text-sm text-gray-500">
              Items in wishlist will be stored for up to 30 days.
            </p>
          </div>
          <WishlistList />
        </div>
      </Container>
    </div>
  );
};

export default WishlistPage;
