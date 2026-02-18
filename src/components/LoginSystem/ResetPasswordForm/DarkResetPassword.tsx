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
  const router = useRouter();

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

const handleSave = () => {
  setConfirmError("");

  if (newPassword !== confirmPassword) {
    setConfirmError("Passwords do not match");
    return;
  }

  if (!allValid) return;

  router.push("/auth/success");
};

const passwordsDontMatch =
  confirmPassword.length > 0 &&
  newPassword !== confirmPassword;

  return (
    <div className={styles.container}>
      <div className={mainStyles.card}>
           <BrandHeader />
        <div className="flex flex-col items-center w-full">
          <h2 className={`${mainStyles.welcomeHeading} `}>
            Reset Your Password
          </h2>

          {/* New Password */}
          <div className={styles.formGroupSmall}>
            <label className={styles.label}>New Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
                className={styles.passwordInput}
              />

              <Image
                src={
                  showNewPassword
                    ? "/login/eyeopen.svg"
                    : "/login/eyeclosed.svg"
                }
                alt="toggle password"
                width={14}
                height={14}
                className={styles.eyeIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>

            {newPassword.length > 0 && (
              <div className={mainStyles.conditionsList} style={{paddingInline:"15px"}}>
                <p>Your Password Must Have:</p>

                {[
                    {
                      label: "Min 8 Characters",
                      valid: conditions.minLength,
                    },
                    {
                      label: " 1Lowercase Character",
                      valid: conditions.lowercase,
                    },
                    {
                      label: "1Uppercase Character",
                      valid: conditions.uppercase,
                    },
                    {
                      label: "1 Number",
                      valid: conditions.number,
                    },
                    {
                      label: "1 Special Character",
                      valid: conditions.specialChar,
                    },
                  ].map((item, i) => (
                  <p
                    key={i}
                    className={
                      item.valid
                        ? mainStyles.conditionItemValid
                        : mainStyles.conditionItem
                    }
                  >
                    <Image
                      src={
                        item.valid
                          ? "/login/correct.svg"
                          : "/login/wrong.svg"
                      }
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
                <label className={styles.label}>Confirm Password</label>

                <div
                  className={
                    passwordsDontMatch
                      ? styles.passwordWrapperError
                      : styles.passwordWrapper
                  }
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={
                      passwordsDontMatch
                        ? styles.passwordInputError
                        : styles.passwordInput
                    }
                  />

                 <Image
                      src={
                        passwordsDontMatch
                          ? "/login/redeye.svg"
                          : showConfirmPassword
                            ? "/login/eyeopen.svg"
                            : "/login/eyeclosed.svg"
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

                {passwordsDontMatch && (
                  <p className={styles.errorMessage}>
                    Passwords do not match
                  </p>
                )}
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
