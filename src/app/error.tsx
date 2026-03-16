'use client';

import { useEffect } from 'react';
import styles from 'styles/ErrorPage.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Что-то пошло не так!</h2>
      <p className={styles.message}>{error.message}</p>
      <button type="button" onClick={() => reset()} className={styles.button}>
        Повторить
      </button>
    </div>
  );
}

