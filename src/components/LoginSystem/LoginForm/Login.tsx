"use client";

import { BrandHeader } from "@/app/Shared/Functions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import styles from "./Login.module.css";

export default function Login({
  previewMode = false,
  editorMode = false,
  forceMode,
  onModeToggle,
}: {
  previewMode?: boolean;
  editorMode?: boolean;
  forceMode?: "" | "white";
  onModeToggle?: (mode: "" | "white") => void;
}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [internalMode, setInternalMode] = useState<"" | "white">("");

  const mode = forceMode !== undefined ? forceMode : internalMode;
  const isDisabled = previewMode || editorMode;

  // true when any error is active
  const hasError = !!emailError || !!passwordError;

  const toggleMode = () => {
    const newMode = mode === "white" ? "" : "white";
    if (onModeToggle) {
      onModeToggle(newMode);
    } else {
      setInternalMode(newMode);
    }
  };

  const validateEmail = (value: string) => {
    return /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/i.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const handleLogin = () => {
    if (isDisabled) return;
    let valid = true;
    if (!validateEmail(email)) { setEmailError("Invalid or unauthorized email"); valid = false; }
    if (!validatePassword(password)) { setPasswordError("Wrong password"); valid = false; }
    if (!valid) return;
    console.log("Logging in...");
    router.push("/dashboard");
  };

  if (editorMode) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "clamp(0px, 10vw - 90px, 100px)",
        height: "100dvh",
        background: "transparent",
      }}>
        <div className={styles[mode + "card"]} style={{ position: "relative" }}>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMode(); }}
            className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            title="Toggle Theme"
          >
            <Image
              src={mode === "white" ? "/cards/lightmode.svg" : "/cards/darkmode.svg"}
              alt="Theme"
              width={34}
              height={34}
            />
          </button>

          <BrandHeader isBlack={mode === "white"} />
          <h2 className={styles[mode + "welcomeHeading"]}>Welcome Back!</h2>
          <p className={styles[mode + "subtitle"]}>
            Login Is Restricted To Authorized Employees Using<br />Company Email Accounts Only.
          </p>

          <div className={styles.formGroup}>
            <label className={styles[mode + "label"]}>E-Mail</label>
            <input type="email" value={email} disabled className={styles[mode + "input"]} placeholder="Company Email" />
          </div>

          <div className={styles.formGroupSmall}>
            <label className={styles[mode + "label"]}>Password</label>
            <div className={styles[mode + "passwordWrapper"]}>
              <input type="password" value={password} disabled className={styles[mode + "passwordInput"]} placeholder="Password" />
              <Image src={mode === "white" ? "/login/eyeclosedwhite.svg" : "/login/eyeclosed.svg"} alt="eye" width={14} height={14} className={styles.eyeIcon} />
            </div>
          </div>

          <button className={styles[mode + "forgotPassword"]} disabled>Forget Password?</button>
          <button className={styles.signInButton} disabled>Sign In</button>

          <div className={styles[mode + "footer"]}>
            <span>Logging in is just the start ✨The real magic is inside!</span>
            <span>Hit that button and let's blast off!</span>
          </div>
        </div>
      </div>
    );
  }

  // Real auth/login page
  return (
    <div className={styles.container}>
      <div
        className={styles[mode + "card"]}
        style={{ minHeight: hasError ? "634px" : undefined }}
      >
        <BrandHeader isBlack={mode === "white"} />
        <h2 className={styles[mode + "welcomeHeading"]}>Welcome Back!</h2>
        <p className={styles[mode + "subtitle"]}>
          Login Is Restricted To Authorized Employees Using<br />Company Email Accounts Only.
        </p>

        <div className={styles.formGroup}>
          <label className={styles[mode + "label"]}>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (validateEmail(e.target.value)) setEmailError(""); }}
            className={emailError ? styles[mode + "inputError"] : styles[mode + "input"]}
            placeholder="Company Email"
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </div>

        <div className={styles.formGroupSmall}>
          <label className={styles[mode + "label"]}>Password</label>
          <div className={passwordError ? styles[mode + "passwordWrapperError"] : styles[mode + "passwordWrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (validatePassword(e.target.value)) setPasswordError(""); }}
              className={passwordError ? styles[mode + "passwordInputError"] : styles[mode + "passwordInput"]}
              placeholder="Password"
            />
            <Image
              src={
                passwordError
                  ? showPassword ? "/login/openeyered.svg" : "/login/redeye.svg"
                  : showPassword
                  ? mode === "white" ? "/login/openeyewhite.svg" : "/login/eyeopen.svg"
                  : mode === "white" ? "/login/eyeclosedwhite.svg" : "/login/eyeclosed.svg"
              }
              alt="eye"
              width={14}
              height={14}
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
        </div>

        <button className={styles[mode + "forgotPassword"]} onClick={() => router.push("/auth/forget-password")}>
          Forget Password?
        </button>

        <button onClick={handleLogin} className={styles.signInButton}>Sign In</button>

        <div className={styles[mode + "footer"]}>
          <span>Logging in is just the start ✨The real magic is inside!</span>
          <span>Hit that button and let's blast off!</span>
        </div>
      </div>
    </div>
  );
}