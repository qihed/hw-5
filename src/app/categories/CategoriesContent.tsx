'use client';

import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import Header from 'components/Header';
import Text from 'components/Text';
import type { ProductCategory } from 'api/types';
import styles from './categories-page.module.scss';

type CategoriesContentProps = {
  categories: ProductCategory[];
};

const CategoriesContent = observer(({ categories }: CategoriesContentProps) => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.hero}>
        <Text view="title">Categories</Text>
        <Text view="p-20" color="secondary" className={styles.heroText}>
          Browse products by category to find exactly what you&apos;re looking for
        </Text>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {categories.map((category) => {
            const name =
              (typeof category.name === 'string' && category.name.trim()) ||
              (typeof category.slug === 'string' && category.slug.trim()) ||
              `Category ${category.id}`;

            const initial = name.charAt(0).toUpperCase();

            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{initial}</div>
                <span className={styles.categoryName}>{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  </>
));

CategoriesContent.displayName = 'CategoriesContent';

export default CategoriesContent;
