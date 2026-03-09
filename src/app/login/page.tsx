'use client';

import { useState } from 'react';
import Text from 'components/Text';
import Input from 'components/Input';
import styles from './login-page.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmitLogin = () => {
    return;
  };
  return (
    <div>
      <Text view="title">Добро пожаловать</Text>
      <Text view="p-20" color="secondary">
        Войдите в свой аккаунт
      </Text>
      <form action="submit">
        <Input
          value={email}
          placeholder="You email"
          className={styles.input}
          onChange={setEmail}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitLogin()}
        />
        <Input
          value={pass}
          placeholder="You pass"
          className={styles.input}
          onChange={setPass}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitLogin()}
        />
      </form>
    </div>
  );
};

export default LoginPage;
