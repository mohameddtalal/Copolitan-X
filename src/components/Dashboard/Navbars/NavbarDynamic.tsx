"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useNav } from "@/components/Dashboard/Context/Navcontext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { selectedTitle, selectedButton } = useNav(); // just read, no set

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => setIsSearchOpen((prev) => !prev);

  // Navbar theme
  const isWhiteTheme = pathname !== "/dashboard";
  const navbarClass = `${styles.navbar} ${
    isWhiteTheme ? styles.lightNavbar : styles.darkNavbar
  }`;

  const logoSrc = isWhiteTheme ? "/login/logoblack.svg" : "/navbar/Layer_1.svg";

  return (
    <nav className={navbarClass}>
      <div className={styles.row}>
        {/* Logo */}
        <Link href="/dashboard">
          <div className="logo">
            <Image
              src={logoSrc}
              alt="LogoImage"
              className={styles.logoImg}
              width={301}
              height={19}
            />
          </div>
        </Link>

        {/* Title & Button */}
        <div className={styles.navInside}>
          {selectedTitle && (
            <div
              className={styles.title}
              style={{ fontFamily: "Lora", fontWeight: 500, fontStyle: "italic",fontSize:"25px" ,color: isWhiteTheme ? "#000" : "#fff" }}
            >
              <p>{selectedTitle}</p>
            </div>
          )}
          {selectedButton && (
            <div
              className={styles.selectedBtn}
              style={{ fontFamily: "GT Walsheim", fontWeight: 600 ,fontSize:"clamp(0.875rem, 0.625rem + 0.3906vw, 1rem);", color: isWhiteTheme ? "#000" : "#fff" }}
            >
              <p>{selectedButton}</p>
            </div>
          )}
        </div>

        {/* Right-side nav items */}
        <div className={styles.navItems}>
          {/* Search Input */}
          {isSearchOpen && (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />
          )}

          {/* Search Button */}
          <div className={styles.search}>
            <button
              style={{ zIndex: 10, cursor: "pointer" }}
              onClick={handleSearch}
            >
              <Image
                src="/navbar/search.svg"
                alt="search"
                width={18}
                height={18}
              />
            </button>
          </div>

          <div className={styles.line}></div>

          {/* Notifications */}
          <div className={styles.notifications}>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/notificationPage")}
            >
              <Image
                src="/navbar/notification.svg"
                alt="notification"
                width={21}
                height={21}
              />
            </button>
          </div>

          <div className={styles.line}></div>

          {/* Quote Icon */}
          <div className={styles.quote}>
            <Image
              src="/navbar/quote.svg"
              alt="quote"
              width={14}
              height={13}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;