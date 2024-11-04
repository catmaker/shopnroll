"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { Size, Color, SubCategory } from "@/lib/types";
import qs from "query-string";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color | SubCategory)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = new URLSearchParams(searchParams.toString());
    console.log(current);
    const value = current.get(valueKey);
    console.log(value);

    if (value === id) {
      current.delete(valueKey);
    } else {
      current.set(valueKey, id);
    }

    router.push(`?${current.toString()}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="flex items-center flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              onClick={() => onClick(filter.id)}
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
