"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../LoginForm/Login.module.css";
import mainStyles from "./ResetPassword.module.css";
import { WhiteBrandHeader } from "@/app/Shared/Functions";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const router = useRouter();

  // Password validation conditions
  const conditions = {
    minLength: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const allValid =
    conditions.minLength &&
    conditions.uppercase &&
    conditions.lowercase &&
    conditions.number &&
    conditions.specialChar &&
    newPassword === confirmPassword;

  const passwordsDontMatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSave = () => {
    setConfirmError("");

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

    if (!allValid) return;

    router.push("/auth/success");
  };

  return (
    <div className={styles.container}>
      <div className={mainStyles.whitecard}>
        <WhiteBrandHeader />

        <div className="flex flex-col items-center w-full">
          <h2 className={styles.whitewelcomeHeading} style={{ color: "var(--color-primary)" }}>
            Reset Your Password
          </h2>

          {/* New Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles.whitelabel}>New Password</label>

            <div
              className={
                passwordsDontMatch
                  ? styles.whitepasswordWrapperError
                  : styles.whitepasswordWrapper
              }
            >
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
                className={
                  passwordsDontMatch
                    ? styles.whitepasswordInputError
                    : styles.whitepasswordInput
                }
              />
              <Image
                src={showNewPassword ? "/login/openeyewhite.svg" : "/login/eyeclosedwhite.svg"}
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>

            {/* Password Conditions */}
            {newPassword.length > 0 && (
              <div className={mainStyles.conditionsList} style={{ paddingInline: "15px" }}>
                <p style={{ color: "var(--light-text-primary)" }}>Your password must have:</p>

                {[
                  { label: "Min 8 Characters", valid: conditions.minLength },
                  { label: "1 Lowercase Character", valid: conditions.lowercase },
                  { label: "1 Uppercase Character", valid: conditions.uppercase },
                  { label: "1 Number", valid: conditions.number },
                  { label: "1 Special Character", valid: conditions.specialChar },
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
                      src={item.valid ? "/login/correctwhite.svg" : "/login/wrong.svg"}
                      alt="status"
                      width={14}
                      height={14}
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

            <div
              className={
                passwordsDontMatch
                  ? styles.whitepasswordWrapperError
                  : styles.whitepasswordWrapper
              }
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={
                  passwordsDontMatch
                    ? styles.whitepasswordInputError
                    : styles.whitepasswordInput
                }
              />

              <Image
                src={
                  passwordsDontMatch
                    ? "/login/redeye.svg"
                    : showConfirmPassword
                    ? "/login/openeyewhite.svg"
                    : "/login/eyeclosedwhite.svg"
                }
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>

            {passwordsDontMatch && (
              <p className={styles.errorMessage}>Passwords do not match</p>
            )}
          </div>

          {/* Save Button */}
          <button onClick={handleSave} className={styles.signInButton} disabled={!allValid}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
