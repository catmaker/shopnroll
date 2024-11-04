import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import NoResults from "@/components/ui/no-results";
import Filter from "./components/filter";
import ProductCard from "@/components/ui/product-card";
import getSubCategories from "@/actions/get-subcategories";
import MobileFilters from "./components/moblie-filters";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId?: string;
    sizeId?: string;
    subCategoryId?: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    subCategoryId: searchParams.subCategoryId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  const subCategories = await getSubCategories(params.categoryId);
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-6">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
              <Filter
                valueKey="subCategoryId"
                name="Categories"
                data={subCategories}
              />
            </div>
            <div className="lg:col-span-4 h-full">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    subCategories={subCategories}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
