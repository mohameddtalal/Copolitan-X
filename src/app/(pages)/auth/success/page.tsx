"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Brand header */}
        <div className={styles.brandHeader}>
          <Image
            src="/login/logo (3).svg"
            alt="COPOLITAN"
            width={150}
            height={40}
            className={styles.logo}
            priority
          />
        </div>

        {/* GIF */}
        <Image
          src="/assets/gif.gif"
          alt="success"
          width={106}
          height={95}
          className={styles.successImage}
        />

        {/* Text */}
        <div className={styles.textCenter}>
          <h2 className={styles.title}>
            New Password
            <br />
            Successfully Changed
          </h2>
          <p className={styles.description}>
            You can now use your new password
            <br />
            to login to your account.
          </p>
        </div>

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
};

export default Page;
