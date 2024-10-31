"use client";

import { SubCategory as SubCategoryType } from "@/lib/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SubCategoryProps {
  subCategory: SubCategoryType;
  className?: string;
}

const SubCategory: React.FC<SubCategoryProps> = ({ subCategory, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div className={cn("text-sm", className)}>{subCategory.name}</div>;
};

export default SubCategory;
