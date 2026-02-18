"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import mainStyles from "./Reset.module.css";
import styles from "../LoginForm/Login.module.css";
import { WhiteBrandHeader } from "@/app/Shared/Functions";
export default function Reset() {
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
      <div className={mainStyles.whitecard}>
            <WhiteBrandHeader />
        <div className="flex flex-col items-center">
          <h2 className={`${styles.whitewelcomeHeading} lora-semibold-italic`} style={{color:"#7029CF"}}>
            Forgot Password?
          </h2>

          <p className={`${styles.whitesubtitle} text-black`} >
            No worries, enter your CopolitanX or Moca email &
            <br />
            we’ll send you reset instructions.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.whitelabel}>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.whiteinput}
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
            className={`${styles.whiteforgotPassword} font-gtwalsheim-regular`}
            onClick={() => router.push("/auth/login")}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
