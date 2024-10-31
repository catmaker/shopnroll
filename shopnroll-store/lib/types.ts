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

