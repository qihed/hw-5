/**
 * Страница 404: несуществующий маршрут или вызов notFound() в коде.
 * Стили из shared-модуля, без инлайнов.
 */
import Link from 'next/link';
import styles from 'styles/NotFoundPage.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Страница не найдена</h2>
      <p className={styles.text}>
        К сожалению, мы не смогли найти страницу, которую вы ищете.
      </p>
      <Link href="/" className={styles.linkButton}>
        Вернуться на главную
      </Link>
    </div>
  );
}

