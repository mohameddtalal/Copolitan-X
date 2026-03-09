"use client";

import { useRouter } from "next/navigation";
import mainStyles from "./SuccessReset.module.css";
import styles from "../LoginForm/Login.module.css";
import Image from "next/image";
import { useState } from "react";
import { BrandHeader } from "@/app/Shared/Functions";
export default function SuccessComponent() {
  const router = useRouter();
  const [mode, setMode] = useState<"" | "white">(""); //empty or dark
  return (
    <div className={styles.container}>
      <div className={mainStyles[mode + "card"]}>
        {/* Brand header */}
        <BrandHeader
          isBlack={mode === "white"}
          className={mainStyles.brandHeader}
        />

        {/* Text */}
        <h2 className={`${mainStyles[mode + "welcomeHeading"]} text-black`}>
          Password <br />
          Changed Successfully
        </h2>

        <p className={`${styles[mode + "subtitle"]} `}>
          You can now Sign In using your <br />
          new password.
        </p>

        {/* Sign In button */}
        <button
          onClick={() => router.push("/auth/login")}
          className={styles.signInButton}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
