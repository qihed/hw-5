import { createContext, useContext, type ReactNode } from "react";
import type { ProductPageStore } from "./ProductPageStore";

const ProductPageStoreContext = createContext<ProductPageStore | null>(null);

export function ProductPageStoreProvider({
  store,
  children,
}: {
  store: ProductPageStore;
  children: ReactNode;
}) {
  return (
    <ProductPageStoreContext.Provider value={store}>
      {children}
    </ProductPageStoreContext.Provider>
  );
}

export function useProductPageStore(): ProductPageStore {
  const store = useContext(ProductPageStoreContext);
  if (!store)
    throw new Error(
      "useProductPageStore must be used within ProductPageStoreProvider",
    );
  return store;
}
