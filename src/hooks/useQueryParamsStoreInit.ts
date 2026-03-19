import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from 'store/StoreContext';

export const useQueryParamsStoreInit = (): void => {
  const searchParams = useSearchParams();
  const store = useStore();
  const search = searchParams.toString();

  useEffect(() => {
    store.query.setSearch(search);
  }, [search, store]);
};
