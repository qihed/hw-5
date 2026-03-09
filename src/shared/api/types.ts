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

export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock: boolean;
  images?: StrapiImage[] | { data: StrapiImage[] };
  productCategory?: ProductCategory | { data: ProductCategory };
  [key: string]: unknown;
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
  productId: string;
  quantity?: number;
};

export type Cart = {
  data: CartItem[];
};
