import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ShareSiteButton } from "./ShareSiteButton";
import styles from "./share-page.module.scss";

export const metadata: Metadata = {
  title: "Поделиться — Lalasia",
  description: "Ссылка на магазин Lalasia",
};

export default function SharePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <Image
              src="/Frame.svg"
              alt=""
              width={120}
              height={120}
              className={styles.logoMark}
              aria-hidden
            />
            <Image
              src="/Lalasia.svg"
              alt="Lalasia"
              width={220}
              height={54}
              className={styles.logoWordmark}
              priority
            />
          </div>
        </div>

        <div className={styles.ctaColumn}>
          <Link href="/products" className={styles.goToSite}>
            Перейти на сайт
          </Link>

          <ShareSiteButton />
        </div>
      </main>
    </div>
  );
}
