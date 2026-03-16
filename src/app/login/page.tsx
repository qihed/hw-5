"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "components/Header";
import Text from "components/Text";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import Button from "components/Button";
import EyeIcon from "icons/EyeIcon";
import EyeOffIcon from "icons/EyeOffIcon";
import styles from "./login-page.module.scss";
import { useStore } from "store/StoreContext";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { auth } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    await auth.login();

    if (auth.meta.error) {
      alert("Login failed. Please check your credentials.");
    } else {
      router.replace("/products");
    }
  };

  const eyeToggle = (
    <Button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className={styles.togglePassword}
    >
      {showPassword ? (
        <EyeOffIcon width={20} height={20} />
      ) : (
        <EyeIcon width={20} height={20} />
      )}
    </Button>
  );

  return (
    <div className={styles.page}>
      <Header logoOnly />

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.headerSection}>
            <Text view="title" tag="h1" className={styles.title}>
              Welcome
            </Text>
            <Text view="p-18" color="secondary">
              Log in your account to continue
            </Text>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={styles.form}
          >
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={auth.email}
                onChange={auth.setEmail}
                placeholder="example@email.com"
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={auth.password}
                onChange={auth.setPassword}
                placeholder="Your password"
                className={styles.input}
                afterSlot={eyeToggle}
              />
            </div>

            <div className={styles.rememberRow}>
              <div className={styles.rememberGroup}>
                <CheckBox
                  checked={auth.rememberMe}
                  onChange={auth.setRememberMe}
                  size={17}
                />
                <Text view="p-14" tag="span" color="secondary">
                  Remember me
                </Text>
              </div>
              <a href="#" className={styles.forgotLink}>
                Forgot your password?
              </a>
            </div>

            <Button type="submit" className={styles.submitButton}>
              Log in
            </Button>

            <Text view="p-14" color="secondary" className={styles.registerText}>
              No account?{" "}
              <Link href="/registration" className={styles.registerLink}>
                Register
              </Link>
            </Text>
          </form>

          <div className={styles.divider}>
            <div className={styles.dividerLine}>
              <div className={styles.dividerBorder} />
            </div>
            <div className={styles.dividerText}>
              <Text view="p-14" tag="span" color="secondary">
                or
              </Text>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default observer(LoginPage);
