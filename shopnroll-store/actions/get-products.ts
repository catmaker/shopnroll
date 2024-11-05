import { Product } from "@/lib/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  subCategoryId?: string;
}
const getProducts = async (query: Query): Promise<Product[]> => {
  // console.log("Original query:", query);
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
      subCategoryId: query.subCategoryId,
    },
  });
  // console.log("Final URL:", url);
  const res = await fetch(url, {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  // console.log("API Response:", data);
  return data;
};

export default getProducts;
