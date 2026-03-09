'use client';

import { useRouter } from 'next/navigation';
import Button from 'components/Button';
import { logout } from 'api/auth';
import styles from './profile-page.module.scss';

const ProfilePage = () => {
  const router = useRouter();

  const handleSignOut = () => {
    logout().then(() => {
      router.replace('/');
    });
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default ProfilePage;
