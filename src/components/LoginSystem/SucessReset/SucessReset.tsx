"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import mainStyles from "./SuccessReset.module.css";
import styles from "../LoginForm/Login.module.css";

export default function SuccessComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={mainStyles.card}>
        {/* Brand header */}
        <div className={mainStyles.brandHeader}>
          <Image
            src="/login/logo.svg"
            alt="COPOLITAN"
            width={197}
            height={13}
            className={styles.logo}
            priority
          />
        </div>

        {/* Text */}
        <h2 className={mainStyles.welcomeHeading}>
          Password <br />
          changed successfully
        </h2>

        <p className={styles.subtitle}>
          You can now Sign In using your <br />
          new password.
        </p>

        {/* Sign In button */}
        <button
          onClick={() => router.push("/dashboard")}
          className={mainStyles.signInButton}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
