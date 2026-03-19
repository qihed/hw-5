export type StrapiImage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  previewUrl?: string | null;
  formats?: unknown;
  hash: string;
  ext: string;
  mime: string;
  size: number;
};

export type ProductCategory = {
  id: number;
  documentId: string;
  name?: string;
  slug?: string;
  [key: string]: unknown;
};

/** Normalized product type used across the app. For raw API responses, use ProductApi. */
export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock: boolean;
  images?: StrapiImage[];
  productCategory?: ProductCategory;
  material?: string;
  year?: string;
  company?: string;
  model?: string;
  warranty?: string;
  deliveryTime?: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProductsResponse = {
  data: Product[];
  meta: {
    pagination: PaginationMeta;
  };
};

export type ProductResponse = {
  data: Product;
};

export type ProductCategoryResponse = {
  data: ProductCategory[];
};

export type CartItem = {
  productId: number;
  quantity: number;
};
