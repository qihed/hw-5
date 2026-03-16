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
import styles from "./registration-page.module.scss";
import { observer } from "mobx-react-lite";
import { RegistrationStore } from "store/RegistrationStore";
import { useStore } from "store/StoreContext";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const { auth } = useStore();
  const [reg] = useState(() => new RegistrationStore());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    await reg.registration();

    if (reg.meta.error) {
      alert("Registration failed. Please check your credentials.");
    } else {
      auth.setNickname(reg.username);
      auth.setProfileEmail(reg.email);
      auth.setPhone(reg.phone);
      auth.saveProfile();
      router.replace("/profile");
    }
  };

  const passwordToggle = (
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

  const confirmPasswordToggle = (
    <Button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className={styles.togglePassword}
    >
      {showConfirmPassword ? (
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
              Create account
            </Text>
            <Text view="p-18" color="secondary">
              Join us and start shopping for the best furniture
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
              <label htmlFor="username" className={styles.label}>
                Username <span className={styles.required}>*</span>
              </label>
              <Input
                id="username"
                value={reg.username}
                onChange={reg.setUsername}
                placeholder="Enter your username"
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={reg.email}
                onChange={reg.setEmail}
                placeholder="example@email.com"
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>
              <Input
                id="phone"
                type="tel"
                value={reg.phone}
                onChange={reg.setPhone}
                placeholder="+7 (999) 999-99-99"
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                Password <span className={styles.required}>*</span>
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={reg.password}
                onChange={reg.setPassword}
                placeholder="Minimum 8 characters"
                className={styles.input}
                afterSlot={passwordToggle}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm password <span className={styles.required}>*</span>
              </label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={reg.confirmPassword}
                onChange={reg.setConfirmPassword}
                placeholder="Repeat your password"
                className={styles.input}
                afterSlot={confirmPasswordToggle}
              />
            </div>

            <div className={styles.termsRow}>
              <div className={styles.checkboxBorder}>
                <CheckBox
                  checked={reg.agreeTerms}
                  onChange={reg.setAgreeTerms}
                  size={17}
                />
              </div>
              <Text view="p-14" tag="span" color="secondary">
                I agree to the{" "}
                <a href="#" className={styles.termsLink}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className={styles.termsLink}>
                  Privacy Policy
                </a>
              </Text>
            </div>

            <Button type="submit" className={styles.submitButton}>
              Register
            </Button>

            <Text view="p-14" color="secondary" className={styles.loginText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.loginLink}>
                Log in
              </Link>
            </Text>
          </form>
        </div>
      </main>
    </div>
  );
};

export default observer(RegistrationPage);
