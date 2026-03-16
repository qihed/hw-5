'use client';

import Text from 'components/Text';
import styles from './settings-page.module.scss';

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <Text view="title" tag="h1" className={styles.title}>
        Settings
      </Text>
      <Text view="p-18" color="secondary">
        This section is under development
      </Text>
    </div>
  );
};

export default SettingsPage;
