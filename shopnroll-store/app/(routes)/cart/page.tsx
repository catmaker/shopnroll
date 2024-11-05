import React from "react";
import Container from "@/components/ui/container";
import CartList from "@/components/cart-list";
import CartSummary from "@/components/cart-summary";

const CartPage = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 mt-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cart</h1>
            <p className="text-sm text-gray-500">
              Items in cart will be stored for up to 30 days.
            </p>
          </div>
          <CartList />
          <CartSummary />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
