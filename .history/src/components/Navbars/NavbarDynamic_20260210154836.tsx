"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useNav } from "@/components/Context/Navcontext";
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { selectedTitle, selectedButton } = useNav();
  const router = useRouter();
  const handleSearch = () => {
    setIsSearchOpen((prev) => !prev); // toggle input
  };
  return (
    <nav className={styles.navbar }>
      <div className={styles.row}>
        <Link href="/dashboard">
          <div className="logo">
            <Image
              src="/navbar/Layer_1.svg"
              alt="LogoImage"
              className={styles.logoImg}
              width={301}
              height={26}
            />
          </div>
        </Link>
        <div className={styles.navInside}>
          <div
            className={styles.title}
          >
            <p>{selectedTitle}</p>
          </div>
          <div
            className={styles.selectedBtn}
         
          >
            <p>{selectedButton}</p>
          </div>
        </div>
        <div className={styles.navItems} >
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
          <div className={styles.search}>
            <button
              className={styles.search}
              style={{ zIndex: 10, cursor: "pointer" }}
              onClick={handleSearch}
            >
              <Image
                className="search-img"
                src="/navbar/search.svg"
                alt="search"
                width={18}
                height={18}
              />
            </button>
            {/* Search input (show only if open) */}
          </div>
          <div className={styles.line}></div>
          <div className={styles.notifications}>
            <button
              className="notification"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/notificationPage")}
            >
              <Image
                className="notification-img"
                src="/navbar/notification.svg"
                alt="notification"
                width={21}
                height={21}
              />
            </button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.quote}>
            <Image
              src="/navbar/quote.svg"
              alt="quote"
              width={14}
              height={13}
              className="quote-img"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
