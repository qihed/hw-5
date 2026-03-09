import { createContext, useContext, type ReactNode } from 'react';
import rootStore from 'store/instance';

const StoreContext = createContext(rootStore);

export function StoreProvider({ children }: { children: ReactNode }) {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
