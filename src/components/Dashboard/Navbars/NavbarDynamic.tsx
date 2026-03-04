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
    <nav className={`${navbarClass} main-container`}>
      <div className={styles.row} >
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

        {/* Title & Button (Centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          {selectedButton && (
            <div
            className={styles.selectedBtn}
            style={{fontFamily: "Lora", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(0.9375rem, 0.5725rem + 1.1968vw, 1.5rem)", color: isWhiteTheme ? "#000" : "#fff", lineHeight: "1" }}
            >
              <p>{selectedButton}</p>
            </div>
          )}
          {selectedTitle && (
            <div
              className={styles.title}
              style={{ fontFamily: "GT Walsheim", fontWeight: 600, fontSize: "clamp(0.625rem, 0.4628rem + 0.5319vw, 0.875rem)", color: isWhiteTheme ? "#000" : "#fff", marginTop: "4px"  }}
            >
              <p>{selectedTitle}</p>
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