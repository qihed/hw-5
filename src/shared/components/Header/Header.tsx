"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import cn from "classnames";
import Text from "components/Text";
import CartIcon from "icons/CartIcon";
import CompareIcon from "icons/CompareIcon";
import ProfileIcon from "icons/ProfileIcon";
import ComparisonWidget from "components/ComparisonWidget";
import { isPiPSupported, openComparisonInPiP } from "lib/pipComparison";
import styles from "components/Header/Header.module.scss";
import { useStore } from "@/src/store/StoreContext";
import { observer } from "mobx-react-lite";

const Header = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = usePathname();
  const store = useStore();
  const { cart, auth } = store;
  const [hydrated, setHydrated] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const compareTriggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    queueMicrotask(() => setHydrated(true));
  }, []);

  const items = cart.items;
  const totalCount = cart.totalCount;

  return (
    <header className={`${styles.header} ${logoOnly ? styles.headerLogoOnly : ""}`}>
      {logoOnly ? (
        <div className={styles.logoFrame}>
          <Image src="/Frame.svg" alt="" width={42} height={42} aria-hidden />
          <Image src="/Lalasia.svg" alt="Lalasia" width={77} height={19} />
        </div>
      ) : (
        <Link href="/products" className={styles.logoFrame}>
          <Image src="/Frame.svg" alt="" width={42} height={42} aria-hidden />
          <Image src="/Lalasia.svg" alt="Lalasia" width={77} height={19} />
        </Link>
      )}

      {!logoOnly && (
        <>
          <div className={styles.namePages}>
            <Link href="/products" className={styles.navLink}>
              <Text
                view="p-16"
                className={cn(styles.text, pathname.startsWith('/products') && styles.textAccent)}
              >
                Products
              </Text>
            </Link>
            <Link href="/categories" className={styles.navLink}>
              <Text
                view="p-16"
                className={cn(styles.text, pathname.startsWith('/categories') && styles.textAccent)}
              >
                Categories
              </Text>
            </Link>
            <Link href="/about" className={styles.navLink}>
              <Text
                view="p-16"
                className={cn(styles.text, pathname.startsWith('/about') && styles.textAccent)}
              >
                About us
              </Text>
            </Link>
          </div>
          <div className={styles.actionBtn}>
            <div className={styles.comparePromo}>
              <span className={styles.comparePromoText}>New! Try it if you&apos;re a business →</span>
              <div className={styles.compareWrap}>
              <button
                ref={compareTriggerRef}
                type="button"
                className={styles.iconBtn}
                onClick={() => {
                  if (isPiPSupported()) {
                    openComparisonInPiP(store).catch(() => setCompareOpen(true));
                  } else {
                    setCompareOpen((o) => !o);
                  }
                }}
                aria-label="Сравнение товаров"
              >
                <CompareIcon width={24} height={24} />
                {hydrated && (
                  <span className={styles.iconBadgeNew}>NEW</span>
                )}
              </button>
              <ComparisonWidget
                isOpen={compareOpen}
                onClose={() => setCompareOpen(false)}
                triggerRef={compareTriggerRef}
              />
              </div>
            </div>
            {hydrated && auth.isAuth ? (
              <>
                <div className={styles.bagWrapper}>
                  <Link
                    href="/profile/cart"
                    className={styles.bagLink}
                    aria-label="Корзина"
                  >
                    <CartIcon width={24} height={24} />

                    {items.length !== 0 && (
                      <span className={styles.iconBadge}>{totalCount}</span>
                    )}
                  </Link>
                </div>
                <Link href="/profile" className={styles.profileLink} aria-label="Профиль">
                  <ProfileIcon width={24} height={24} color="primary" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.authBtnLogin}>
                  Log in
                </Link>
                <Link href="/registration" className={styles.authBtnRegister}>
                  Registration
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default observer(Header);
