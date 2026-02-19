"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import mainStyles from "./ForgetPassword.module.css";
import styles from "../LoginForm/Login.module.css";
import { BrandHeader } from "@/app/Shared/Functions";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [mode, setMode] = useState<""|"white">("");//empty or white

  const handleSend = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    router.push("/auth/reset-password");
  };

  return (
    <div className={styles.container}>
      <div className={mainStyles[mode + "card"]}>
        <BrandHeader isBlack={mode === "white"} />
        <div className="flex flex-col items-center">
          <h2
            className={`${styles[mode + "welcomeHeading"]} text-primary`}
            style={{ color: mode === "" ? "var(--color-white)" : "var(--color-primary)" }}
          >
            Forgot Password?
          </h2>

          <p className={`${styles[mode + "subtitle"]} text-black`}>
            No worries, enter your CopolitanX or Moca email &
            <br />
            we’ll send you reset instructions.
          </p>

          <div className={styles.formGroup}>
            <label className={styles[mode + "label"]}>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles[mode + "input"]}
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
