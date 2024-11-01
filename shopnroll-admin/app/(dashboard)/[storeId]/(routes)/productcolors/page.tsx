import ProductColorClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProductColorColumn } from "./components/columns";
import { format } from "date-fns";
const ProductColorsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const productColors = await prismadb.productColor.findMany({
    where: {
      product: {
        storeId: params.storeId,
      },
    },
    include: {
      color: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const groupedColors = productColors.reduce(
    (acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          id: item.productId,
          productName: item.product.name,
          colors: [],
          createdAt: item.createdAt,
        };
      }

      acc[item.productId].colors.push({
        id: item.id,
        name: item.color.name,
        value: item.color.value,
      });

      return acc;
    },
    {} as Record<
      string,
      {
        id: string;
        productName: string;
        colors: Array<{ id: string; name: string; value: string }>;
        createdAt: Date;
      }
    >
  );
  const formattedProductColors = Object.values(groupedColors).map((item) => ({
    id: item.id,
    productId: item.id,
    productName: item.productName,
    colors: item.colors,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  console.log(formattedProductColors);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductColorClient data={formattedProductColors} />
      </div>
    </div>
  );
};

export default ProductColorsPage;
