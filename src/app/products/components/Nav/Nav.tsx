'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.scss';
import Text from 'components/Text';
import { getProductsPageUrl } from 'lib/productsUrl';

export type NavProps = {
  currentPage: number;
  pageCount: number;
  searchQuery?: string;
  categoryParam?: string | null;
};

const Nav = ({ currentPage, pageCount, searchQuery = '', categoryParam = null }: NavProps) => {
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(pageCount, currentPage + 1);

  const pages = useMemo(() => {
    const result: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
      result.push(i);
    }
    return result;
  }, [pageCount]);

  const toPageUrl = (page: number) => {
    const { pathname, search } = getProductsPageUrl({
      page,
      search: searchQuery,
      category: categoryParam,
    });
    return search ? `${pathname}?${search}` : pathname;
  };

  return (
    <div className={styles.container}>
      <Link
        href={toPageUrl(prevPage)}
        className={currentPage <= 1 ? styles.disabled : undefined}
        aria-disabled={currentPage <= 1}
      >
        <Image className={`${styles.start} ${styles.block}`} src="/right-arrow.png" alt="страница" width={24} height={24} />
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={toPageUrl(page)}
          className={page === currentPage ? styles.linkActive : styles.link}
        >
          <Text
            className={page === currentPage ? `${styles.text} ${styles.textAccent}` : styles.text}
          >
            {page}
          </Text>
        </Link>
      ))}
      <Link
        href={toPageUrl(nextPage)}
        className={currentPage >= pageCount ? styles.disabled : undefined}
        aria-disabled={currentPage >= pageCount}
      >
        <Image src="/right-arrow.png" alt="страница" width={24} height={24} />
      </Link>
    </div>
  );
};

export default Nav;
