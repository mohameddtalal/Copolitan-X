"use client"
import React, { useState } from 'react'
import { BrandHeader } from '../reset/page'
import styles from "../login/page.module.css";
import mainStyles from "./page.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function page() {
    const [email, setEmail] = useState("");
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

    const handleSave = () => {
        router.push("/auth/success");
    };
    return (
        <>
            <div className={styles.container}>
                <div className={` ${mainStyles.card}`}>
                    <BrandHeader />
                    <div className="flex flex-col items-center w-full">
                        <h2 className={`${styles.welcomeHeading} lora-semibold-italic`}>
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
                                    placeholder="Enter new password"
                                    className={styles.passwordInput}
                                />
                                <Image
                                    src={showNewPassword ? "/login/eyeopen.svg" : "/login/eyeclosed.svg"}
                                    alt="toggle password"
                                    width={14}
                                    height={14}
                                    className={styles.eyeIcon}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                />
                            </div>

                            {/* Conditions */}
                            {newPassword.length > 0 && (
                                <div className={mainStyles.conditionsList}>
                                    {[
                                        { label: "At least 1 Uppercase & 1 lowercase character", valid: conditions.uppercaseLowercase },
                                        { label: "At least 8 Characters", valid: conditions.minLength },
                                        { label: "At least 1 Number", valid: conditions.number },
                                        { label: "At least 1 Special character", valid: conditions.specialChar },
                                    ].map((item, i) => (
                                        <p
                                            key={i}
                                            className={item.valid ? mainStyles.conditionItemValid : mainStyles.conditionItem}
                                        >
                                            <Image
                                                src={item.valid ? "/login/correct.png" : "/login/wrong.svg"}
                                                alt="status"
                                                width={12}
                                                height={12}
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
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    className={styles.passwordInput}
                                />
                                <Image
                                    src={showConfirmPassword ? "/login/eyeopen.svg" : "/login/eyeclosed.svg"}
                                    alt="toggle password"
                                    width={14}
                                    height={14}
                                    className={styles.eyeIcon}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className={styles.signInButton}
                        >
                            Save
                        </button>
                    </div>

                </div></div></>
    )
}
