"use client";

import { BrandHeader } from "@/app/Shared/Functions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"" | "white">("");

  // ✅ Validation functions
  const validateEmail = (value: string) => {
    return /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/i.test(
      value
    );
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  // ✅ Handle Login
  const handleLogin = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid or unauthorized email");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Wrong password");
      valid = false;
    }

    if (!valid) return;

    console.log("Logging in...");
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles[mode + "card"]}>
        <BrandHeader isBlack={mode === "white"} />

        <h2 className={styles[mode + "welcomeHeading"]}>
          Welcome Back!
        </h2>

        <p className={styles[mode + "subtitle"]}>
          Login Is Restricted To Authorized Employees Using
          <br />
          Company Email Accounts Only.
        </p>

        {/* ================= EMAIL ================= */}
        <div className={styles.formGroup}>
          <label className={styles[mode + "label"]}>E-Mail</label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              // ✅ remove error instantly when valid
              if (validateEmail(value)) {
                setEmailError("");
              }
            }}
            className={
              emailError
                ? styles[mode + "inputError"]
                : styles[mode + "input"]
            }
            placeholder="Company Email"
          />

          {emailError && (
            <p className={styles.errorMessage}>{emailError}</p>
          )}
        </div>

        {/* ================= PASSWORD ================= */}
        <div className={styles.formGroupSmall}>
          <label className={styles[mode + "label"]}>Password</label>

          <div
            className={
              passwordError
                ? styles[mode + "passwordWrapperError"]
                : styles[mode + "passwordWrapper"]
            }
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                // ✅ remove error instantly when valid
                if (validatePassword(value)) {
                  setPasswordError("");
                }
              }}
              className={
                passwordError
                  ? styles[mode + "passwordInputError"]
                  : styles[mode + "passwordInput"]
              }
              placeholder="Password"
            />

            <Image
              src={
                passwordError
                  ? showPassword
                    ? "/login/openeyered.svg"
                    : "/login/redeye.svg"
                  : showPassword
                  ? mode === "white"
                    ? "/login/openeyewhite.svg"
                    : "/login/eyeopen.svg"
                  : mode === "white"
                  ? "/login/eyeclosedwhite.svg"
                  : "/login/eyeclosed.svg"
              }
              alt="eye"
              width={14}
              height={14}
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {passwordError && (
            <p className={styles.errorMessage}>{passwordError}</p>
          )}
        </div>

        {/* ================= FORGOT PASSWORD ================= */}
        <button
          className={styles[mode + "forgotPassword"]}
          onClick={() => router.push("/auth/forget-password")}
        >
          Forget Password?
        </button>

        {/* ================= SIGN IN ================= */}
        <button
          onClick={handleLogin}
          className={styles.signInButton}
        >
          Sign In
        </button>

        {/* ================= FOOTER ================= */}
        <div className={`${styles[mode + "footer"]} `}>
          <span>
            Logging in is just the start ✨The real magic is inside!
          </span>
          <span>Hit that button and let's blast off!</span>
        </div>
      </div>
    </div>
  );
}
