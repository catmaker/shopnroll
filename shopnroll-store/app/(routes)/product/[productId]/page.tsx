import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import Gallery from "@/components/gallery";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const relatedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  console.log(relatedProducts);
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product?.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">Info</div>
          </div>
          <hr className="my-10" />
          <ProductList
            title="Related Items"
            products={relatedProducts}
            subCategories={[]}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
