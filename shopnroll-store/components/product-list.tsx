import { Product } from "@/lib/types";
import React from "react";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { SubCategory } from "@/lib/types";

interface ProductListProps {
  title: string;
  products: Product[];
  subCategories: SubCategory[];
}

export const revalidate = 0;

const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  subCategories,
}) => {
  return (
    <div className="space-y-4 pb-10">
      <h3 className="font-bold text-3xl">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            subCategories={subCategories}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
