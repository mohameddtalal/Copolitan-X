"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useNav } from "@/components/Context/Navcontext";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { selectedTitle, selectedButton } = useNav();
  const router = useRouter();
  const handleSearch = () => {
    setIsSearchOpen((prev) => !prev); // toggle input
  };
  return (
    <nav className="navbar border ">
      <div className="row">
        <Link href="/dashboard">
          <div className="logo">
            <Image
              src="/navbar/Layer_1.svg"
              alt="LogoImage"
              className="logo-img"
              width={301}
              height={19}
            />
          </div>
        </Link>
        <div className="nav-inside">
          <div
            className=""
            style={{ marginBottom: "0px", color: "var(--black)" }}
          >
            <p>{selectedTitle}</p>
          </div>
          <div
            className=""
            style={{
              marginTop: "0px",
              color: "var(--black)",
              fontSize: "16px",
            }}
          >
            <p>{selectedButton}</p>
          </div>
        </div>
        <div className="navItems" style={{ position: "relative" }}>
          {isSearchOpen && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />
          )}
          <div className="search">
            <button
              className="search"
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
          <div className="line"></div>
          <div className="notifications">
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
          <div className="line"></div>
          <div className="quote">
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
