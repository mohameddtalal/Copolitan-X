"use client";

import { useRouter } from "next/navigation";
import mainStyles from "./SuccessReset.module.css";
import styles from "../LoginForm/Login.module.css";
import { WhiteBrandHeader } from "@/app/Shared/Functions";
import Image from "next/image";
export default function SuccessComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={mainStyles.whitecard}>
        {/* Brand header */}
        <div className={mainStyles.brandHeader}>
          <Image
            src="/login/logoblack.svg"
            alt="COPOLITAN"
            width={197}
            height={13}
            className={styles.logo}
            priority
          />
        </div>

        {/* Text */}
        <h2 className={`${mainStyles.whitewelcomeHeading} text-black`}>
          Password <br/>
          Changed Successfully
        </h2>

        <p className={`${styles.whitesubtitle} `}>
          You can now Sign In using your <br />
          new password.
        </p>

        {/* Sign In button */}
        <button
          onClick={() => router.push("/dashboard")}
          className={styles.signInButton}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
