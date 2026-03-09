'use client';

import Link from 'next/link';
import Image from 'next/image';
import Text from 'components/Text';
import styles from 'components/Header/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src="/logo.png" alt="Logo" width={120} height={40} />

      <div className={styles.namePages}>
        <Link href="/products" className={styles.productsLink}>
          <Text view="p-16" className={`${styles.text} ${styles.textAccent}`}>
            Products
          </Text>
        </Link>
        <Text view="p-16" className={styles.text}>
          Categories
        </Text>
        <Text view="p-16" className={styles.text}>
          About us
        </Text>
      </div>
      <div className={styles.actionBtn}>
        <Link href="/cart" className={styles.bagLink} aria-label="Корзина">
          <Image className={styles.bag} src="/bag-2.png" alt="Bag items" width={24} height={24} />
        </Link>
        <Image className={styles.user} src="/user.png" alt="User profile" width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
