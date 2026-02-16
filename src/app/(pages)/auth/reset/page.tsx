"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import mainStyles from "./page.module.css";
import styles from "../login/page.module.css";
export const BrandHeader = () => (
    <div className={styles.brandHeader}>
        <Image
            src="/login/logo.svg"
            alt="COPOLITAN"
            width={197}
            height={13}
            priority
        />
    </div>
);
const Page = () => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1 = email, 2 = mail sent, 3 = new password
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const handleSend = () => {
        if (!email) return alert("Please enter your email");
        router.push("/auth/reset-password");
    };






    /* ── brand header (steps 1 & 3) ── */


    return (
        <div className={styles.container}>
            <div className={` ${mainStyles.card}`}>

                {/* ── STEP 1: Enter Email ── */}

                <>
                    <BrandHeader />
                    <div className="flex flex-col items-center">
                        <h2 className={`${styles.welcomeHeading} ${styles.loraSemiboldItalic}`}>
                            Forgot Password?
                        </h2>
                        <p className={`${styles.subtitle} font-gtwalsheim-semibold `}>
                            No worries, enter your CopolitanX or Moca email &
                            <br />we’ll send you reset instructions.
                        </p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>E-Mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="Company Email "
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
                </>






            </div>
        </div>
    );
};

export default Page;
