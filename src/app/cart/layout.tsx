'use client';

import Header from 'components/Header';
import styles from './cart-page.module.scss';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
}
