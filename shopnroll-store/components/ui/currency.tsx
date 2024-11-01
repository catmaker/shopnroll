"use client";
import React, { useEffect, useState } from "react";
import { cn, formatter } from "@/lib/utils";

const Currency = ({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("font-semibold text-sm text-gray-500", className)}>
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
