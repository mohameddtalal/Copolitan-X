"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import mainStyles from "./page.module.css";
import styles from "../LoginForm/page.module.css";
import { BrandHeader } from "@/app/Shared/Functions";
export default function ResetComponent() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    router.push("/auth/reset-password");
  };

  return (
    <div className={styles.container}>
      <div className={mainStyles.card}>
            <BrandHeader />
        <div className="flex flex-col items-center">
          <h2 className={`${styles.welcomeHeading} ${styles.loraSemiboldItalic}`}>
            Forgot Password?
          </h2>

          <p className={`${styles.subtitle} font-gtwalsheim-semibold`}>
            No worries, enter your CopolitanX or Moca email &
            <br />
            we’ll send you reset instructions.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Company Email"
            />
          </div>

          <button
            onClick={handleSend}
            className={styles.signInButton}
            style={{ marginBottom: 24 }}
          >
            Send
          </button>

          <button
            className={`${styles.forgotPassword} font-gtwalsheim-regular`}
            onClick={() => router.push("/auth/login")}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
