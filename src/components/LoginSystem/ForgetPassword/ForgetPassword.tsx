"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import mainStyles from "./ForgetPassword.module.css";
import styles from "../LoginForm/Login.module.css";
import { BrandHeader } from "@/app/Shared/Functions";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mode, setMode] = useState<"" | "white">("");

  // ✅ Email validation function (same as login page)
  const validateEmail = (value: string) => {
    return /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/i.test(
      value
    );
  };

  const handleSend = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid or unauthorized email");
      return;
    }

    setEmailError("");
    router.push("/auth/reset-password");
  };

  return (
    <div className={styles.container}>
      <div className={mainStyles[mode + "card"]}>
        <BrandHeader isBlack={mode === "white"} />
        <div className="flex flex-col items-center">
          <h2
            className={`${styles[mode + "welcomeHeading"]} text-primary`}
            style={{
              color:
                mode === "" ? "var(--color-white)" : "var(--color-primary)",
            }}
          >
            Forgot Password?
          </h2>

          <p className={`${mainStyles[mode + "subtitle"]} `}>
            No worries, enter your CopolitanX or Moca email & <br />
            we’ll send you reset instructions.
          </p>

          <div className={styles.formGroup}>
            <label className={styles[mode + "label"]}>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                // ✅ remove error instantly if valid
                if (validateEmail(value)) {
                  setEmailError("");
                }
              }}
              className={
                emailError
                  ? styles[mode + "inputError"]
                  : styles[mode + "input"]
              }
              placeholder="Company Email"
            />
            {emailError && (
              <p className={styles.errorMessage}>{emailError}</p>
            )}
          </div>

          <button
            onClick={handleSend}
            className={styles.signInButton}
            style={{ marginBottom: 24 }}
          >
            Send
          </button>

          <button
            className={`${styles[mode + "forgotPassword"]} `}
            onClick={() => router.push("/auth/login")}
          >
            Back To Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
