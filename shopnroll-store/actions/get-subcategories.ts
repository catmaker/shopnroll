import { SubCategory } from "@/lib/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subcategories`;

const getSubCategories = async (): Promise<SubCategory[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getSubCategories;
