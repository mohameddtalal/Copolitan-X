
"use client";
import { BrandHeader } from "@/app/Shared/Functions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (
      !/^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/i.test(email)
    ) {
      setEmailError("Invalid or unauthorized email");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Wrong password");
      valid = false;
    }

    if (!valid) return;

    console.log("Logging in...");
    router.push("/dashboard");
  };
  return (
    <>
     <div className={styles.container} > 
      <div className={styles.card}>
          <BrandHeader/>
    {/* Welcome heading */}
        <h2 className={`${styles.welcomeHeading} lora-semibold-italic`}>
          Welcome Back!
        </h2>
        <p className={`${styles.subtitle} font-gtwalsheim-semibold`}>
          Login Is Restricted To Authorized Employees Using
          <br />
          Company Email Accounts Only.
        </p>

        {/* Email */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            E-Mail
          </label>
          <input
          
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? styles.inputError : styles.input}
            placeholder="Company Email"
          />
          {emailError && (
            <p className={styles.errorMessage}>{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className={styles.formGroupSmall}>
          <label className={styles.label}>
            Password
          </label>
          <div className={passwordError ? styles.passwordWrapperError : styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? styles.passwordInputError : styles.passwordInput}
              placeholder="Password"
            />
            <Image
              src={showPassword ? "/login/eyeopen.svg" : "/login/eyeclosed.svg"}
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

        {/* Forgot Password */}
        <button
          className={styles.forgotPassword}
          onClick={() => router.push("/auth/reset")}
        >
          Forget Password?
        </button>

        {/* Sign In */}
        <button
          onClick={handleLogin}
          className={styles.signInButton}
        >
          Sign In
        </button>

        {/* Footer */}
        <div className={`${styles.footer} font-gtwalsheim`}>
          <span>Logging in is just the start ✨The real magic is inside!</span>
          <span>Hit that button and let's blast off!</span>
        </div>
         </div>
        </div>
        </>
    
  )
}

