'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import styles from './products-page.module.scss';
import Description from './components/Description';
import TechInfo from './components/TechInfo';
import ProductCardList from 'components/ProductCardList';
import SkeletonCard from 'components/Skeleton';
import Text from 'components/Text';
import Nav from './components/Nav';
import Header from 'components/Header';
import { useStore } from 'store/StoreContext';
import { observer } from 'mobx-react-lite';

function parseCategoryIds(param: string | null): number[] {
  if (!param?.trim()) return [];
  return param
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
}

const ProductsPage = () => {
  const { catalog } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageParam = searchParams.get('page');
  const searchQuery = searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category');
  const pageNumber = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const categoryIds = useMemo(() => parseCategoryIds(categoryParam), [categoryParam]);
  const isPageOutOfRange =
    !catalog.loadingProducts && catalog.pageCount > 0 && pageNumber > catalog.pageCount;

  useEffect(() => {
    catalog.loadCategories();
  }, [catalog]);

  useEffect(() => {
    catalog.loadProducts({
      page: pageNumber,
      search: searchQuery,
      categoryIds,
    });
  }, [catalog, pageNumber, searchQuery, categoryIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageParam]);

  const applySearchParams = (updater: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams.toString());
    updater(next);
    next.set('page', '1');
    router.replace(`${pathname}?${next.toString()}`);
  };

  const handleSearchSubmit = (value: string) => {
    applySearchParams((next) => {
      if (value.trim()) next.set('search', value.trim());
      else next.delete('search');
    });
  };

  const handleCategoryChange = (ids: number[]) => {
    applySearchParams((next) => {
      if (ids.length) next.set('category', ids.join(','));
      else next.delete('category');
    });
  };

  const handleClearSearch = () => {
    applySearchParams((next) => next.delete('search'));
  };

  const handleClearCategory = () => {
    applySearchParams((next) => next.delete('category'));
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Description />
        <TechInfo
          total={catalog.total}
          loading={catalog.loadingProducts}
          searchValue={searchQuery}
          onSearchSubmit={handleSearchSubmit}
          selectedCategoryIds={categoryIds}
          onCategoryChange={handleCategoryChange}
          onClearSearch={handleClearSearch}
          onClearCategory={handleClearCategory}
        />
        <div className={styles.mainContent}>
          {catalog.loadingProducts ? (
            <div>
              <SkeletonCard />
            </div>
          ) : isPageOutOfRange ? (
            <div className={styles.emptySearch}>
              <Text view="title">Такой страницы не существует</Text>
            </div>
          ) : catalog.products.length === 0 && (searchQuery.trim() || categoryIds.length > 0) ? (
            <div className={styles.emptySearch}>
              <Text view="title">По выбранным фильтрам товаров не найдено</Text>
            </div>
          ) : (
            <ProductCardList
              products={catalog.products}
              loading={catalog.loadingProducts}
              error={catalog.errorProducts}
            />
          )}
        </div>
        <nav className={styles.paginationWrap} aria-label="Пагинация">
          <Nav
            currentPage={catalog.currentPage}
            pageCount={catalog.pageCount}
            searchQuery={searchQuery}
            categoryParam={categoryParam}
          />
        </nav>
      </main>
    </>
  );
};

export default observer(ProductsPage);
