/**
 * Клиентская обёртка: настраивает MobX и даёт доступ к store всему дереву (StoreProvider).
 */
'use client';

import 'config/configureMobX';
import { StoreProvider } from 'store/StoreContext';
import { useQueryParamsStoreInit } from 'hooks/useQueryParamsStoreInit';

export function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

export function QueryParamsSync() {
  useQueryParamsStoreInit();
  return null;
}
