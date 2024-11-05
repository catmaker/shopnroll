import React from "react";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import BrowseCategories from "@/components/brouse-categories";
import getCategories from "@/actions/get-categories";
import getSubCategories from "@/actions/get-subcategories";
import BrandMessage from "@/components/brand-message";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("0fc37012-203f-4f1c-9ce0-4944e0c7e83a");
  const products = await getProducts({
    isFeatured: true,
  });
  const categories = await getCategories();
  const subCategories = await getSubCategories();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <BrandMessage />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <BrowseCategories title="Browse Categories" data={subCategories} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList
          title="Featured Products"
          products={products}
          subCategories={subCategories}
        />
      </div>
    </Container>
  );
};

export default HomePage;
