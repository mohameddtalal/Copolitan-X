"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./PropertyManagement.module.css"
import Link from "next/link";

const ROWS_PER_PAGE = 7;

const PropertyManagement = () => {
  const [activeTab, setActiveTab] = useState("Property Directory");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [isLogoToggled, setIsLogoToggled] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
   const [addForm, setAddForm] = useState({ id: "", lob: "", location: "", country: "", city: "", area: "", gross: "", net: "", duration: "", end: "", launch: "" });
  const [addError, setAddError] = useState("");
  const [dynamicRows, setDynamicRows] = useState<{id:string;lob:string;location:string;country:string;city:string;area:string;gross:string;net:string;duration:string;end:string;launch:string}[]>([]);

  // ── Full dataset (70 rows generated from the original 10, repeated) ──────────
  const baseProperties = [
    { id: "24CX009", lob: "Copolitan X", location: "Swanlake", country: "KSA", city: "Jeddah", area: "Bab Makkah", gross: "10,000", net: "7,890", duration: "3 mos.", end: "28 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX008", lob: "Copolitan X", location: "Palm Hills Club", country: "Oman", city: "Muskat", area: "Muttrah", gross: "10,000", net: "7,890", duration: "1 yr.", end: "20 Sep 2029", launch: "14 Aug 2025" },
    { id: "24CX007", lob: "Copolitan X", location: "Mivida", country: "Egypt", city: "Giza", area: "October", gross: "8,0450", net: "7,456", duration: "5 yr.", end: "14 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX006b", lob: "Moca X Lounge", location: "Mivida", country: "Egypt", city: "Giza", area: "October", gross: "800", net: "7,890", duration: "5 yr.", end: "14 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX006", lob: "Copolitan X", location: "Swanlake", country: "Egypt", city: "Giza", area: "October", gross: "10,000", net: "7,890", duration: "10 yr.", end: "15 Feb 2025", launch: "14 Aug 2025" },
    { id: "24CX005", lob: "Copolitan X", location: "Hassan Allam", country: "Egypt", city: "Giza", area: "October", gross: "15,000", net: "7,890", duration: "10 yr.", end: "22 Jan 2027", launch: "14 Aug 2025" },
    { id: "24CX004", lob: "Copolitan X", location: "Seven Fortunes - Marassi Bay", country: "Oman", city: "Muskat", area: "Muttrah", gross: "9,000", net: "7,890", duration: "1 yr.", end: "28 Sep 2026", launch: "14 Aug 2025" },
    { id: "24CX003", lob: "Copolitan X", location: "Seven Fortunes - Red", country: "KSA", city: "Jeddah", area: "Bab Makkah", gross: "9,000", net: "7,890", duration: "5 yr.", end: "27 Jun 2028", launch: "14 Aug 2025" },
    { id: "24CX002", lob: "Copolitan X", location: "BeFit Marassi", country: "Egypt", city: "Giza", area: "October", gross: "9,000", net: "7,890", duration: "12 yr.", end: "12 Nov 2030", launch: "14 Aug 2025" },
    { id: "24CX001", lob: "Copolitan X", location: "Copolitan X Swanlake", country: "Egypt", city: "Giza", area: "October", gross: "9,000", net: "7,890", duration: "8 yr.", end: "1 Jul 2026", launch: "14 Aug 2025" },
  ];

  // Generate 70 rows by repeating base data, prepend any dynamically added rows
  const generatedProperties = Array.from({ length: 70 }, (_, i) => ({
    ...baseProperties[i % baseProperties.length],
    id: baseProperties[i % baseProperties.length].id + (i >= baseProperties.length ? `-${Math.floor(i / baseProperties.length)}` : ""),
  }));
  const allProperties = [...dynamicRows, ...generatedProperties];
 
  const totalPages = Math.ceil(allProperties.length / ROWS_PER_PAGE);
 
  // Slice rows for current page
  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
  const pageEnd = pageStart + ROWS_PER_PAGE;
  const properties = allProperties.slice(pageStart, pageEnd);
 
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedRow(null); // collapse any expanded row on page change
  };
 
  // Build visible page numbers (show 7 around current)
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      pages.push(p);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const sideIcons = [
    <svg key="add" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"/>
      <path d="M15 21.3333C15 21.5985 15.1053 21.8529 15.2929 22.0404C15.4804 22.228 15.7347 22.3333 16 22.3333C16.2652 22.3333 16.5195 22.228 16.7071 22.0404C16.8946 21.8529 17 21.5985 17 21.3333V17H21.3333C21.5985 17 21.8529 16.8946 22.0404 16.7071C22.2279 16.5196 22.3333 16.2652 22.3333 16C22.3333 15.7348 22.2279 15.4804 22.0404 15.2929C21.8529 15.1053 21.5985 15 21.3333 15H17V10.6667C17 10.4014 16.8946 10.1471 16.7071 9.95955C16.5195 9.77201 16.2652 9.66666 16 9.66666C15.7347 9.66666 15.4804 9.77201 15.2929 9.95955C15.1053 10.1471 15 10.4014 15 10.6667V15H10.6666C10.4014 15 10.1471 15.1053 9.95952 15.2929C9.77198 15.4804 9.66663 15.7348 9.66663 16C9.66663 16.2652 9.77198 16.5196 9.95952 16.7071C10.1471 16.8946 10.4014 17 10.6666 17H15V21.3333Z" fill="#242424" stroke="#242424"/>
    </svg>,
    <svg key="transfer" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"/>
      <path d="M11.8086 8.01427C11.2908 8.06227 10.9846 8.17107 10.5906 8.44627C10.2877 8.65747 10.0662 8.90707 9.86106 9.27187C9.72102 9.52467 9.65263 9.80947 9.6103 10.2959L9.5875 10.5743H8.53233C7.3534 10.5743 7.34689 10.5743 7.14823 10.7919C7.0147 10.9359 6.97562 11.0735 6.99842 11.3135C7.01796 11.5087 7.14497 11.6783 7.35014 11.7807C7.49018 11.8511 7.51949 11.8543 8.5421 11.8543H9.59076L9.61355 12.1327C9.64612 12.5679 9.71451 12.8399 9.85455 13.1183C10.1607 13.7199 10.6948 14.1487 11.3722 14.3375C11.6653 14.4207 13.7528 14.4431 14.1925 14.3663C14.9155 14.2447 15.544 13.7839 15.8827 13.1183C16.0879 12.7151 16.1139 12.5487 16.1335 11.4607C16.1595 10.0623 16.0977 9.64307 15.8078 9.15667C15.4659 8.59347 14.8992 8.18387 14.2739 8.05907C14.0003 8.00147 12.2547 7.96947 11.8086 8.01427Z" fill="#2C2C2C"/>
      <path d="M17.853 10.6214C17.3417 10.8422 17.3548 11.5942 17.8758 11.8086C17.9833 11.8502 18.3383 11.8566 20.745 11.8566H23.4904L23.6337 11.783C23.917 11.6422 24.0408 11.3734 23.9789 11.0406C23.9528 10.903 23.7574 10.679 23.6109 10.6182C23.4578 10.5574 17.9996 10.5574 17.853 10.6214Z" fill="#2C2C2C"/>
      <path d="M16.7457 16.6432C16.0618 16.768 15.4202 17.2512 15.0978 17.888C14.8926 18.2944 14.8698 18.4608 14.8503 19.5456C14.8308 20.5824 14.8633 21.0592 14.9741 21.4112C15.2118 22.1696 15.8762 22.7584 16.7131 22.9472C16.9411 23.0016 17.117 23.008 18.0972 23.008C19.0612 23.008 19.2599 22.9984 19.4944 22.9504C20.2108 22.8 20.7873 22.3648 21.1097 21.7344C21.2693 21.4176 21.3377 21.1584 21.3735 20.7104L21.3963 20.432H22.4515C23.6304 20.432 23.6369 20.432 23.8356 20.2144C23.9691 20.0704 24.0082 19.9328 23.9854 19.6928C23.9658 19.4976 23.8388 19.328 23.6336 19.2224C23.4936 19.1552 23.4643 19.152 22.4417 19.152H21.393L21.3702 18.8704C21.3214 18.256 21.1944 17.9072 20.8752 17.4976C20.5691 17.104 20.1262 16.8096 19.6116 16.6688C19.3348 16.5888 17.143 16.5696 16.7457 16.6432Z" fill="#2C2C2C"/>
      <path d="M7.36643 19.2132C7.21337 19.2836 7.07658 19.418 7.02773 19.546C6.97888 19.6708 6.98214 19.9332 7.03425 20.058C7.09612 20.1988 7.32409 20.394 7.45436 20.4164C7.51298 20.426 8.80915 20.4292 10.33 20.426L13.0982 20.4164L13.2155 20.3396C13.4272 20.1988 13.489 20.0708 13.489 19.7892C13.489 19.562 13.4825 19.5332 13.3881 19.418C13.336 19.3508 13.2252 19.2644 13.1471 19.2228L13.0038 19.1524H10.2486C7.63999 19.1524 7.49019 19.1556 7.36643 19.2132Z" fill="#2C2C2C"/>
    </svg>,
    <svg key="download" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"/>
      <path d="M16.3838 17.6898C16.7073 17.568 16.9885 17.3664 17.3729 16.9867C17.7432 16.6211 19.0651 15.0274 19.187 14.7977C19.2713 14.643 19.2245 14.2305 19.1026 14.0617C18.8916 13.7617 18.4041 13.6727 18.1041 13.8742C18.0151 13.9305 17.6823 14.3055 17.3588 14.7086L16.7729 15.4398L16.7495 11.0898C16.726 6.76797 16.726 6.73985 16.6276 6.6086C16.2854 6.14922 15.7135 6.14922 15.3713 6.6086C15.2729 6.73985 15.2729 6.76329 15.2588 11.0992L15.2495 15.4586L14.6495 14.718C14.3213 14.3148 13.9838 13.9305 13.8948 13.8742C13.5948 13.6727 13.1073 13.7617 12.8963 14.0617C12.7745 14.2305 12.7276 14.643 12.812 14.7977C12.8448 14.8586 13.1776 15.2852 13.5526 15.7539C14.7338 17.2258 15.2963 17.6945 15.9245 17.732C16.0979 17.7461 16.2807 17.7273 16.3838 17.6898Z" fill="#242424"/>
      <path d="M6.8965 13.2815C6.68087 13.3471 6.49806 13.5065 6.42306 13.6987C6.23556 14.1627 6.20744 15.8737 6.36681 16.9658C6.94806 20.9362 9.60119 24.1612 13.2387 25.319C16.7824 26.4487 20.6777 25.2955 23.1856 22.3799C25.0277 20.233 25.9559 17.3315 25.7074 14.5002C25.6231 13.5627 25.4777 13.3283 24.9481 13.2908C24.6012 13.2674 24.3949 13.3846 24.2496 13.6799C24.1512 13.8815 24.1512 13.9096 24.2074 14.5096C24.2731 15.2268 24.2402 16.2205 24.1324 16.8908C23.5043 20.7487 20.6168 23.7018 16.9887 24.1846C13.8012 24.6065 10.6184 22.9471 8.94025 19.9799C8.03087 18.3721 7.61369 16.3893 7.79181 14.4862C7.85275 13.8815 7.84806 13.8533 7.75431 13.6705C7.59962 13.3612 7.20587 13.183 6.8965 13.2815Z" fill="#242424"/>
    </svg>,
    <svg key="filter" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"/>
      <path d="M7.99963 7H23.9997C24.552 7 24.9997 7.44764 24.9997 7.99987L24.9999 9.58569C25 9.85097 24.8946 10.1054 24.707 10.293L18.2925 16.7071C18.105 16.8946 17.9996 17.149 17.9996 17.4142V23.7192C17.9996 24.3698 17.3882 24.8472 16.7571 24.6894L14.7571 24.1894C14.3119 24.0781 13.9996 23.6781 13.9996 23.2192V17.4142C13.9996 17.149 13.8943 16.8946 13.7067 16.7071L7.29252 10.2929C7.10498 10.1054 6.99963 9.851 6.99963 9.58579V8C6.99963 7.44772 7.44734 7 7.99963 7Z" stroke="#242424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="grid" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"/>
      <rect x="8" y="8" width="6" height="6" rx="1" fill="#242424"/>
      <rect x="18" y="8" width="6" height="6" rx="1" fill="#242424"/>
      <rect x="8" y="18" width="6" height="6" rx="1" fill="#242424"/>
      <rect x="18" y="18" width="6" height="6" rx="1" fill="#242424"/>
    </svg>,
  ];

  const accentColor = isLogoToggled ? "#7029CF" : "#00FF85";

  const colDefs = [
    { label: "ID",                thW: 130, wrap: false },
    { label: "LOB",               thW: 110, wrap: true  },
    { label: "Location",          thW: 110, wrap: true  },
    { label: "Country",           thW: 100, wrap: true  },
    { label: "City",              thW: 100, wrap: true  },
    { label: "Area",              thW: 110, wrap: true  },
    { label: "Gross",             thW: 100, wrap: true  },
    { label: "Net",               thW: 100, wrap: true  },
    { label: "Contract Duration", thW: 180, wrap: true  },
    { label: "Contract End",      thW: 130, wrap: true  },
    { label: "Launch Date",       thW: 110, wrap: true  },
    { label: "Action",            thW: 110, wrap: false },
  ];

  const thStyle = (w: number): React.CSSProperties => ({
    width: w, minWidth: w, maxWidth: w,
    height: 48, paddingBottom: 16,
    whiteSpace: "nowrap", overflow: "hidden",
    textOverflow: "ellipsis", boxSizing: "border-box",
  });

  const tdStyle = (w: number, wrap: boolean, isRed: boolean): React.CSSProperties => ({
    width: w, minWidth: w, maxWidth: w,
    whiteSpace: wrap ? "normal" : "nowrap",
    wordBreak: wrap ? "break-word" : "normal",
    overflowWrap: wrap ? "break-word" : "normal",
    overflow: "hidden", boxSizing: "border-box",
    color: isRed ? "#FA6E6E" : "#666",
  });

  const ActionButtons = () => (
    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
      <button style={{ color: "#7029CF", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.13593 5.81903L12.72 3.13548C13.0955 3.03035 13.4415 3.37632 13.3363 3.75178L10.6528 13.3359C10.5262 13.788 9.90272 13.8321 9.71365 13.4025L7.76177 8.96635C7.7114 8.85187 7.61996 8.76043 7.50548 8.71006L3.06938 6.75817C2.63969 6.56911 2.68387 5.94561 3.13593 5.81903Z" fill="#7029CF" stroke="#7029CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button style={{ color: "#00FF85", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M13.0413 5.12732C13.2799 4.89028 13.5047 4.65913 13.678 4.47498C13.8526 4.28936 13.97 4.15611 14.0012 4.10974C14.3025 3.6533 14.3183 3.02708 14.0432 2.54529C14.0328 2.52729 13.9955 2.48069 13.9309 2.40759C13.8685 2.33691 13.785 2.24615 13.6868 2.14197C13.4903 1.93348 13.2359 1.67257 12.9778 1.41248C12.7197 1.15239 12.4579 0.893262 12.2454 0.689819C12.1392 0.588184 12.0453 0.500954 11.9709 0.43396C11.8952 0.365728 11.8431 0.321734 11.8176 0.305054C11.4988 0.0959799 11.0707 0.019202 10.6995 0.0950928L10.5442 0.137085C10.4358 0.173226 10.2787 0.246095 10.2004 0.298218L10.1995 0.299194L10.0784 0.39978C10.0166 0.454899 9.9376 0.52882 9.84595 0.615601C9.66252 0.789291 9.43011 1.01523 9.19458 1.25232L8.38208 2.06482L10.3137 3.99255L12.2415 5.92517L13.0413 5.12732Z" fill="#00A394" stroke="#7029CF" strokeWidth="0.133333"/>
          <path d="M4.04756 6.30525C0.30381 10.0552 0.413185 9.9365 0.306935 10.3334C0.24131 10.5771 -0.0149401 12.9459 0.000684889 13.1896C0.0288099 13.7459 0.431935 14.1834 1.01318 14.2896C1.16943 14.3177 1.37881 14.3021 2.47568 14.1771C3.90381 14.0146 3.98506 14.0021 4.27256 13.8677C4.46006 13.7771 4.72256 13.524 8.00693 10.2459L11.5382 6.72087L9.56943 4.75212C8.48818 3.67087 7.59443 2.78337 7.58506 2.78337C7.57568 2.78337 5.98506 4.36775 4.04756 6.30525Z" fill="#00A394"/>
        </svg>
      </button>
    </div>
  );

  // ── Dashed separator row ─────────────────────────────────────────────────────
  const DashSeparator = ({ colCount }: { colCount: number }) => (
    <tr aria-hidden="true" style={{ height: 12 }}>
      <td colSpan={colCount + 1} style={{ padding: "6px 0", height: 12 }}>
        <div style={{ borderTop: "1.5px dashed #808080" }} />
      </td>
    </tr>
  );

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="notifClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.04,0 L 0.96,0 Q 1,0 1,0.02 L 1,0.98 Q 1,1 0.96,1 L 0.04,1 Q 0,1 0,0.98 L 0,0.06 Q 0,0.03 0.015,0.015 Q 0.03,0 0.04,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="flex w-full h-full bg-[#F7F7F7]"
        style={{ padding: "30px 64px", position: "relative", fontFamily: "GT Walsheim", fontWeight: "600" }}
      >
        {/* Floating Icons RIGHT */}
        <div style={{ position: "absolute", right: "16px", top: "28%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "8px", zIndex: 30 }}>
          {sideIcons.map((icon, i) => (
            <button key={i}
              onClick={i === 0 ? () => { setAddForm({ id: "", lob: "", location: "", country: "", city: "", area: "", gross: "", net: "", duration: "", end: "", launch: "" }); setAddError(""); setShowAddModal(true); } : undefined}
              style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", transition: "transform 0.2s", padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Tabs */}
          <div className="absolute top-[3%]  right-[5%] md:right-[6%] lg:right-[6%] xl:right-[14%] z-40">
          <div className="flex bg-[#FFFFFF] rounded-full py-4 px-5 shadow-inner">
            {["Property Directory", "Settings", "Custom Lists"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs transition-all duration-300 ${activeTab === tab ? "bg-[#7029CF8F] text-[#242424] shadow-md" : "text-[#7029CF] hover:bg-[#E0CCFF]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main White Card */}
        <div className="flex flex-col" style={{ position: "relative", flex: 1, width: "100%", height: "100%", padding: "25px 50px 25px 25px", backgroundColor: "white", clipPath: "url(#notifClip)", WebkitClipPath: "url(#notifClip)", overflow: "hidden", boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>

          {/* Top Bar */}
          <div className="flex items-center mb-10" style={{ gap: 1, paddingRight: 40 }}>
            <h2 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: "500", fontSize: "clamp(1.375rem, 1.125rem + 0.3906vw, 1.5rem);", color: "#7029CF", marginRight: "clamp(0.5625rem, -20.8125rem + 33.3984vw, 11.25rem);" }}>
              {activeTab}
            </h2>

            {/* Toggle */}
            <div className="flex items-center" style={{ position: "relative" }}>
              <button
                onClick={() => setIsLogoToggled(prev => !prev)}
                style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: isLogoToggled ? "#7029CF" : "#000", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", cursor: "pointer", zIndex: 20, position: "relative", transition: "background-color 0.3s", flexShrink: 0 }}
              >
                <Image src="/cards/logogreen.svg" alt="Xlogo" width={14} height={14} />
              </button>
              <div className={styles.line} />
              <div style={{ position: "relative", borderRadius: 9999, background: isLogoToggled ? "#7029CF" : "rgba(255,255,255,0.2)", zIndex: 20, marginLeft: -4, transition: "background 0.3s" }}>
                <div style={{ position: "relative", borderRadius: 9999, padding: "8px 10px", display: "flex", alignItems: "center", gap: 16, fontSize: 12, fontWeight: 600, backgroundColor: isLogoToggled ? "#7029CF" : "#000", transition: "background-color 0.3s" }}>
                  <div style={{ position: "absolute", inset: 2, borderRadius: 9999, border: "1px solid #808080", pointerEvents: "none" }} />
                  <span onClick={() => setStatusFilter("Active")} style={{ cursor: "pointer", position: "relative", zIndex: 10, color: statusFilter === "Active" ? accentColor : "#808080", transition: "color 0.3s" }}>
                    Active
                    {statusFilter === "Active" && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, backgroundColor: accentColor, borderRadius: 2, display: "block", transition: "background-color 0.3s" }} />}
                  </span>
                  <span style={{ color: "#808080", fontWeight: 300, zIndex: 10 }}>|</span>
                  <span onClick={() => setStatusFilter("Inactive")} style={{ cursor: "pointer", position: "relative", zIndex: 10, color: statusFilter === "Inactive" ? accentColor : "#808080", transition: "color 0.3s" }}>
                    Inactive
                    {statusFilter === "Inactive" && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, backgroundColor: accentColor, borderRadius: 2, display: "block", transition: "background-color 0.3s" }} />}
                  </span>
                </div>
              </div>
            </div>

            {/* Archived */}
            <button className="flex items-center gap-1 bg-[#555555] rounded-full px-2 py-2 text-[#B1B1B1] hover:bg-[#555] transition-colors" style={{ flexShrink: 0, fontFamily: "GT Walsheim", fontWeight: "600", fontSize: "12px", position: "relative" }}>
              <div style={{ position: "absolute", inset: 2, borderRadius: 9999, border: "1px solid #808080", pointerEvents: "none" }} />
              Archived
              <Image src="/cards/archive.svg" alt="archive" width={14} height={14} />
            </button>
          </div>

          {/* Table — no overflow-y scroll; rows are paginated instead */}
          <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: "none", overflowY: "hidden" }}>
            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 36 }} />
                {colDefs.map((c, i) => (
                  <col key={i} style={{ width: c.thW, minWidth: c.thW }} />
                ))}
              </colgroup>

              {/* ── Header ── */}
              <thead>
                <tr style={{ color: "#7029CF", fontSize: 16, fontWeight: 600, fontFamily: "GT Walsheim", textAlign: "center" }}>
                  <th style={{ width: 36, paddingBottom: 16 }} />
                  {colDefs.map((c, i) => (
                    <th key={i} style={thStyle(c.thW)}>{c.label}</th>
                  ))}
                </tr>
                {/* solid line after header */}
                <tr aria-hidden="true">
                  <td colSpan={colDefs.length + 1} style={{ padding: 0, height: 0 }}>
                    <div style={{ borderTop: "1.5px solid #808080", margin: "0 4px 8px" }} />
                  </td>
                </tr>
              </thead>

              {/* ── Body ── */}
              <tbody>
                {properties.map((prop, idx) => {
                  const isExpanded = expandedRow === idx;
                  const isEndMissing = !prop.end || prop.end.trim() === "";
                  const endDate = isEndMissing ? null : new Date(prop.end);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isEndRed = isEndMissing || (endDate !== null && endDate < today);
                  const isLast = idx === properties.length - 1;

                  return (
                    <React.Fragment key={`${prop.id}-${idx}`}>
                      {/* ── Main row ── */}
                      <tr
                        style={{ backgroundColor: "transparent", cursor: "pointer" }}
                        onClick={() => setExpandedRow(isExpanded ? null : idx)}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F9F7FF"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <td style={{ padding: "10px 0 10px 8px", width: 36 }}>
                          <div style={{ width: 20, height: 20, backgroundColor: "#7029CF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </td>
                        <td style={{ ...tdStyle(130, false, false), padding: "10px 8px", fontSize: 12, fontWeight: 500, textAlign: "center" }}>{prop.id}</td>
                        <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.lob}</td>
                        <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", textAlign: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 400, color: "#7029CF", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer", wordBreak: "break-word" }}>{prop.location}</span>
                        </td>
                        <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.country}</td>
                        <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.city}</td>
                        <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.area}</td>
                        <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.gross}</td>
                        <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.net}</td>
                        <td style={{ ...tdStyle(180, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.duration}</td>
                        <td style={{ ...tdStyle(130, true, isEndRed), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{isEndMissing ? "Missing Date" : prop.end}</td>
                        <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{prop.launch}</td>
                        <td style={{ padding: "10px 8px", width: 110 }} onClick={e => e.stopPropagation()}>
                          <ActionButtons />
                        </td>
                      </tr>

                      {/* ── Expanded sub-row ── */}
                      {isExpanded && (
                        <tr style={{ backgroundColor: "#F0E6FF" }}>
                          <td style={{ padding: "10px 0 10px 32px", width: 36 }} />
                          <td style={{ ...tdStyle(130, false, false), padding: "10px 8px", fontSize: 12, fontWeight: 500, textAlign: "center", color: "#888" }} />
                          <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.lob}</td>
                          <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", textAlign: "center" }}>
                            <span style={{ fontSize: 12, fontWeight: 400, color: "#7029CF", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer", wordBreak: "break-word" }}>{prop.location}</span>
                          </td>
                          <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.country}</td>
                          <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.city}</td>
                          <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.area}</td>
                          <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.gross}</td>
                          <td style={{ ...tdStyle(100, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.net}</td>
                          <td style={{ ...tdStyle(180, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.duration}</td>
                          <td style={{ ...tdStyle(130, true, isEndRed), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center" }}>{isEndMissing ? "Missing Date" : prop.end}</td>
                          <td style={{ ...tdStyle(110, true, false), padding: "10px 8px", fontSize: 12, fontWeight: 400, textAlign: "center", color: "#888" }}>{prop.launch}</td>
                          <td style={{ padding: "10px 8px", width: 110 }}>
                            <ActionButtons />
                          </td>
                        </tr>
                      )}

                      {/* ── Dashed separator (skip after last row) ── */}
                      {!isLast && <DashSeparator colCount={colDefs.length} />}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

         {/* ── Pagination ── */}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* First page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15.707 5.293a1 1 0 010 1.414L12.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  <path d="M9.707 5.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
              {/* Prev page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
 
              {/* Page numbers */}
              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-[#999]">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p as number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentPage === p
                        ? "bg-[#7029CF] text-white shadow-md"
                        : "text-[#666] hover:bg-[#F0E6FF] hover:text-[#7029CF]"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
 
              {/* Next page */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40"
              >
                <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
              {/* Last page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40"
              >
                <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15.707 5.293a1 1 0 010 1.414L12.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  <path d="M9.707 5.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
            </div>
 
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#999] font-medium">
                Displaying {pageStart + 1} – {Math.min(pageEnd, allProperties.length)} of {allProperties.length} records
              </span>
              <button
                onClick={() => { setCurrentPage(1); }}
                className="bg-[#E5E5E5] px-6 py-2 rounded-full text-xs font-bold text-[#666] hover:bg-[#D5D5D5] transition-colors"
              >
                All
              </button>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* ── Add Property Modal ── */}
      {showAddModal && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{ backgroundColor: "#fff", borderRadius: 24, padding: "36px 40px", width: "min(680px, 92vw)", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 48px rgba(112,41,207,0.18)", position: "relative" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 22, color: "#7029CF", margin: 0 }}>Add New Property</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 22, lineHeight: 1, padding: 4 }}>✕</button>
            </div>
 
            {/* Grid of inputs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px" }}>
              {([
                { key: "id",       label: "ID",                placeholder: "e.g. 24CX010" },
                { key: "lob",      label: "LOB",               placeholder: "e.g. Copolitan X" },
                { key: "location", label: "Location",          placeholder: "e.g. Swanlake" },
                { key: "country",  label: "Country",           placeholder: "e.g. Egypt" },
                { key: "city",     label: "City",              placeholder: "e.g. Giza" },
                { key: "area",     label: "Area",              placeholder: "e.g. October" },
                { key: "gross",    label: "Gross",             placeholder: "e.g. 10,000" },
                { key: "net",      label: "Net",               placeholder: "e.g. 7,890" },
                { key: "duration", label: "Contract Duration", placeholder: "e.g. 5 yr." },
                { key: "end",      label: "Contract End",      placeholder: "e.g. 14 Aug 2026" },
                { key: "launch",   label: "Launch Date",       placeholder: "e.g. 14 Aug 2025" },
              ] as { key: keyof typeof addForm; label: string; placeholder: string }[]).map(({ key, label, placeholder }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#7029CF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                  <input
                    value={addForm[key]}
                    onChange={e => setAddForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ border: "1.5px solid #E0D4F5", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: "#333", outline: "none", fontFamily: "GT Walsheim", transition: "border-color 0.2s" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#7029CF")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E0D4F5")}
                  />
                </div>
              ))}
            </div>
 
            {/* Error */}
            {addError && (
              <p style={{ color: "#FA6E6E", fontSize: 12, marginTop: 14, marginBottom: 0 }}>{addError}</p>
            )}
 
            {/* Actions */}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 28 }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: "10px 28px", borderRadius: 999, border: "1.5px solid #E0D4F5", background: "none", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F7F3FF")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!addForm.id.trim() || !addForm.lob.trim() || !addForm.location.trim()) {
                    setAddError("ID, LOB and Location are required.");
                    return;
                  }
                  setDynamicRows(prev => [{ ...addForm }, ...prev]);
                  setCurrentPage(1);
                  setShowAddModal(false);
                }}
                style={{ padding: "10px 28px", borderRadius: 999, border: "none", background: "#7029CF", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim", boxShadow: "0 2px 12px rgba(112,41,207,0.25)", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PropertyManagement;