"use client";
import React, { useEffect, useState } from "react";
import { formatter } from "@/lib/utils";

const Currency = ({ value }: { value: string | number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold text-sm text-gray-500">
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
