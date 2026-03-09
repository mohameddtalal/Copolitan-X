"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../LoginForm/Login.module.css";
import mainStyles from "./ResetPassword.module.css";
import { BrandHeader } from "@/app/Shared/Functions";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [mode] = useState<"" | "white">("");
  const router = useRouter();

  // Password validation conditions
  const conditions = {
    minLength: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const passwordsDontMatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const passwordInvalid =
    newPassword.length > 0 &&
    (!conditions.minLength ||
      !conditions.uppercase ||
      !conditions.lowercase ||
      !conditions.number ||
      !conditions.specialChar ||
      passwordsDontMatch);

  const allValid =
    conditions.minLength &&
    conditions.uppercase &&
    conditions.lowercase &&
    conditions.number &&
    conditions.specialChar &&
    newPassword === confirmPassword;

  // conditions list is visible when user has started typing
  const showConditions = newPassword.length > 0;

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
      <div
        className={mainStyles[mode + "card"]}
        style={{ minHeight: showConditions ? "604px" : undefined }}
      >
        <BrandHeader isBlack={mode === "white"} />

        <div className="flex flex-col items-center w-full">
          <h2
            className={styles[mode + "welcomeHeading"]}
            style={{
              color: mode === "" ? "var(--color-white)" : "var(--color-primary)",
            }}
          >
            Reset Your Password
          </h2>

          {/* New Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles[mode + "label"]}>New Password</label>

            <div
              className={
                passwordInvalid
                  ? styles[mode + "passwordWrapperError"]
                  : styles[mode + "passwordWrapper"]
              }
            >
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
                className={
                  passwordInvalid
                    ? styles[mode + "passwordInputError"]
                    : styles[mode + "passwordInput"]
                }
              />

              <Image
                src={
                  passwordInvalid
                    ? showNewPassword ? "/login/openeyered.svg" : "/login/redeye.svg"
                    : showNewPassword ? "/login/openeyewhite.svg" : "/login/eyeclosedwhite.svg"
                }
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>

            {/* Password Conditions — triggers card height change */}
            {showConditions && (
              <div className={mainStyles.conditionsList} style={{ paddingInline: "15px" }}>
                <p style={{ color: mode === "" ? "var(--color-white)" : "var(--light-text-primary)" }}>
                  Your password must have:
                </p>

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
                        ? mainStyles[mode + "conditionItemValid"]
                        : mainStyles["conditionItem"]
                    }
                  >
                    <Image
                      src={item.valid ? (mode === 'white' ? '/login/correctwhite.svg' : '/login/correct.svg') : '/login/wrong.svg'}
                      alt="status"
                      width={29}
                      height={25}
                    />
                    {item.label}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles[mode + "label"]}>Confirm Password</label>

            <div
              className={
                passwordInvalid
                  ? styles[mode + "passwordWrapperError"]
                  : styles[mode + "passwordWrapper"]
              }
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={
                  passwordInvalid
                    ? styles[mode + "passwordInputError"]
                    : styles[mode + "passwordInput"]
                }
              />

              <Image
                src={
                  passwordInvalid
                    ? showConfirmPassword ? "/login/openeyered.svg" : "/login/redeye.svg"
                    : showConfirmPassword ? "/login/openeyewhite.svg" : "/login/eyeclosedwhite.svg"
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