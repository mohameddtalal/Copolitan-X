"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../LoginForm/Login.module.css";
import mainStyles from "./ResetPassword.module.css";
import { WhiteBrandHeader } from "@/app/Shared/Functions";
import { style } from "framer-motion/client";
export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const conditions = {
    uppercaseLowercase: /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword),
    minLength: newPassword.length >= 8,
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const allValid =
    conditions.uppercaseLowercase &&
    conditions.minLength &&
    conditions.number &&
    conditions.specialChar &&
    newPassword === confirmPassword;

  const handleSave = () => {
    if (!allValid) return;
    router.push("/auth/success");
  };

  return (
    <div className={styles.container}>
      <div className={mainStyles.whitecard}>
           <WhiteBrandHeader />
        <div className="flex flex-col items-center w-full">
          <h2 className={`${styles.whitewelcomeHeading}`} style={{color:"#7029CF"}}>
            Reset Your Password
          </h2>

          {/* New Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles.whitelabel}>New Password</label>

            <div className={styles.whitepasswordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className={styles.whitepasswordInput}
              />

              <Image
                src={
                  showNewPassword
                    ? "/login/openeyewhite.svg"
                    : "/login/eyeclosedwhite.svg"
                }
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>

            {newPassword.length > 0 && (
              <div className={mainStyles.conditionsList}>
                <p style={{color:"#555555"}}>Your password must have:</p>

                {[
                  {
                    label:
                      "At least 1 Uppercase & 1 lowercase character",
                    valid: conditions.uppercaseLowercase,
                  },
                  {
                    label: "At least 8 Characters",
                    valid: conditions.minLength,
                  },
                  {
                    label: "At least 1 Number",
                    valid: conditions.number,
                  },
                  {
                    label: "At least 1 Special character",
                    valid: conditions.specialChar,
                  },
                ].map((item, i) => (
                  <p
                    key={i}
                    className={
                      item.valid
                        ? mainStyles.whiteconditionItemValid
                        : mainStyles.conditionItem
                    }
                  >
                    <Image
                      src={
                        item.valid
                          ? "/login/correctwhite.svg"
                          : "/login/wrong.svg"
                      }
                      alt="status"
                      width={28}
                      height={28}
                    />
                    {item.label}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles.whitelabel}>Confirm Password</label>

            <div className={styles.whitepasswordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={styles.whitepasswordInput}
              />

              <Image
                src={
                  showConfirmPassword
                    ? "/login/openeyewhite.svg"
                    : "/login/eyeclosedwhite.svg"
                }
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className={styles.signInButton}
            disabled={!allValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
