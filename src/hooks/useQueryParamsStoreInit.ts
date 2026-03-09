import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import rootStore from 'store/instance';

export const useQueryParamsStoreInit = (): void => {
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
