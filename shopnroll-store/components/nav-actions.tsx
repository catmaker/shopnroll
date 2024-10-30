"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, Menu, Search } from "lucide-react";
import Button from "@/components/ui/button";

const NavActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="relative flex items-center">
        <ShoppingCart strokeWidth={2} />
        <span className="ml-2 text-sm font-medium">0</span>
      </Button>
    </div>
  );
};

export default NavActions;
