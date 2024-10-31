import React from "react";
import { SubCategory } from "@/lib/types";

interface BrowseCategoriesProps {
  title: string;
  data: SubCategory[];
}

const BrowseCategories = ({ title, data }: BrowseCategoriesProps) => {
  return (
    <div className="space-y-4 pb-10">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 border rounded-md text-center">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;