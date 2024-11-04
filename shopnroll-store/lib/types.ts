export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: Category;
  subCategory: SubCategory;
  isFeatured: boolean;
  isArchived: boolean;
  description?: string;
  size: Size;
  color: Color;
  images: Image[];
  productColors: ProductColor[];
  productSizes: ProductSize[];
}
export interface ProductColor {
  id: string;
  productId: string;
  colorId: string;
  color: Color;
}
export interface ProductSize {
  id: string;
  productId: string;
  sizeId: string;
  size: Size;
}
export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export type WishlistItem = {
  product: Product;
  selectedColor?: string | null;
  selectedSize?: string | null;
  quantity?: number;
};
