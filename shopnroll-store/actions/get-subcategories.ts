import { SubCategory } from "@/lib/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subcategories`;

const getSubCategories = async (
  categoryId?: string
): Promise<SubCategory[]> => {
  const url = categoryId ? `${URL}?categoryId=${categoryId}` : URL;
  const res = await fetch(url);
  return res.json();
};

export default getSubCategories;
