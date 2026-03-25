"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import styles from "./PropertyManagement.module.css"
import Link from "next/link";

const ROWS_PER_PAGE = 7;

type PropertyRow = { id: string; lob: string; location: string; country: string; city: string; area: string; gross: string; net: string; duration: string; end: string; launch: string };

const PropertyManagement = () => {
  const [activeTab, setActiveTab] = useState("Property Directory");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [isLogoToggled, setIsLogoToggled] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<PropertyRow>({ id: "", lob: "", location: "", country: "", city: "", area: "", gross: "", net: "", duration: "", end: "", launch: "" });
  const [addError, setAddError] = useState("");

  // Active / Inactive row lists
  const [activeRows, setActiveRows] = useState<PropertyRow[]>([]);
  const [inactiveRows, setInactiveRows] = useState<PropertyRow[]>([]);
  // IDs of seeded generated rows that have been unpublished (removed from active)
  const [excludedGeneratedIds, setExcludedGeneratedIds] = useState<string[]>([]);

  // Modal states
  const [publishModalRow, setPublishModalRow] = useState<PropertyRow | null>(null);
  const [unpublishModalRow, setUnpublishModalRow] = useState<PropertyRow | null>(null);
  const [deleteModalRow, setDeleteModalRow] = useState<PropertyRow | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Publish: inactive → active
  const confirmPublish = () => {
    if (!publishModalRow) return;
    setInactiveRows(prev => prev.filter(r => r.id !== publishModalRow.id));
    setActiveRows(prev => [publishModalRow, ...prev]);
    setPublishModalRow(null);
    setCurrentPage(1);
  };

  // Unpublish: active → inactive
  const confirmUnpublish = () => {
    if (!unpublishModalRow) return;
    const inActiveRows = activeRows.some(r => r.id === unpublishModalRow.id);
    if (inActiveRows) {
      // Row was previously published from inactive, remove from activeRows
      setActiveRows(prev => prev.filter(r => r.id !== unpublishModalRow.id));
    } else {
      // Row is a seeded/generated row — exclude it from generatedProperties view
      setExcludedGeneratedIds(prev => [...prev, unpublishModalRow.id]);
    }
    setInactiveRows(prev => [unpublishModalRow, ...prev]);
    setUnpublishModalRow(null);
    setCurrentPage(1);
  };

  // Delete: remove from inactive
const confirmDelete = () => {
  if (!deleteModalRow) return;

  setInactiveRows(prev =>
    prev.filter(row => row.id !== deleteModalRow.id)
  );

  setDeleteModalRow(null);
  setCurrentPage(1);
};

  // Export current table as .xls
  const handleExport = () => {
    const rows = statusFilter === "Active" ? allActiveProperties : allInactiveProperties;
    const data = rows.map(r => ({
      ID: r.id, LOB: r.lob, Location: r.location, Country: r.country, City: r.city,
      Area: r.area, Gross: r.gross, Net: r.net, "Contract Duration": r.duration,
      "Contract End": r.end, "Launch Date": r.launch
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, statusFilter);
    XLSX.writeFile(wb, `${statusFilter}_Properties.xls`);
    setShowExportModal(false);
  };

  // ── Full dataset ──────────────────────────────────────────────────────────────
  const baseProperties = [
    { id: "24CX009", lob: "Copolitan X", location: "Swanlake", country: "KSA", city: "Jeddah", area: "Bab Makkah", gross: "10,000", net: "7,890", duration: "3 mos.", end: "28 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX008", lob: "Copolitan X", location: "Palm Hills Club", country: "Oman", city: "Muskat", area: "Muttrah", gross: "10,000", net: "7,890", duration: "1 yr.", end: "20 Sep 2029", launch: "14 Aug 2025" },
    { id: "24CX007", lob: "Copolitan X", location: "Mivida", country: "Egypt", city: "Giza", area: "October", gross: "8,0450", net: "7,456", duration: "5 yr.", end: "14 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX006b", lob: "Moca X Lounge", location: "Mivida", country: "Egypt", city: "Giza", area: "October", gross: "800", net: "7,890", duration: "5 yr.", end: "14 Aug 2026", launch: "14 Aug 2025" },
    { id: "24CX006", lob: "Copolitan X", location: "Swanlake", country: "Egypt", city: "Giza", area: "October", gross: "10,000", net: "7,890", duration: "10 yr.", end: "15 Feb 2025", launch: "14 Aug 2025" },
    { id: "24CX005", lob: "Copolitan X", location: "Hassan Allam", country: "Egypt", city: "Giza", area: "October", gross: "15,000", net: "7,890", duration: "10 yr.", end: "22 Jan 2027", launch: "14 Aug 2025" },
    { id: "24CX004", lob: "Copolitan X", location: "Seven Fortunes ", country: "Oman", city: "Muskat", area: "Muttrah", gross: "9,000", net: "7,890", duration: "1 yr.", end: "28 Sep 2026", launch: "14 Aug 2025" },
    { id: "24CX003", lob: "Copolitan X", location: "Seven Fortunes ", country: "KSA", city: "Jeddah", area: "Bab Makkah", gross: "9,000", net: "7,890", duration: "5 yr.", end: "27 Jun 2028", launch: "14 Aug 2025" },
    { id: "24CX002", lob: "Copolitan X", location: "BeFit Marassi", country: "Egypt", city: "Giza", area: "October", gross: "9,000", net: "7,890", duration: "12 yr.", end: "12 Nov 2030", launch: "14 Aug 2025" },
    { id: "24CX001", lob: "Copolitan X", location: "Copolitan X", country: "Egypt", city: "Giza", area: "October", gross: "9,000", net: "7,890", duration: "8 yr.", end: "1 Jul 2026", launch: "14 Aug 2025" },
  ];

  const generatedProperties = Array.from({ length: 70 }, (_, i) => ({
    ...baseProperties[i % baseProperties.length],
    id: baseProperties[i % baseProperties.length].id + (i >= baseProperties.length ? `-${Math.floor(i / baseProperties.length)}` : ""),
  }));

  // All active = explicitly-active rows + seeded rows (excluding unpublished ones)
  const allActiveProperties = [...activeRows, ...generatedProperties.filter(p => !excludedGeneratedIds.includes(p.id))];
  const allInactiveProperties = [...inactiveRows];

  const allProperties = statusFilter === "Active" ? allActiveProperties : allInactiveProperties;

  const totalPages = Math.ceil(allProperties.length / ROWS_PER_PAGE);
  const pageStart = (currentPage - 1) * ROWS_PER_PAGE;
  const pageEnd = pageStart + ROWS_PER_PAGE;
  const properties = allProperties.slice(pageStart, pageEnd);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedRow(null);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) pages.push(p);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const sideIcons = [
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
      <path d="M16.3953 23.5053L16.388 23.5066L16.3407 23.53L16.3273 23.5326L16.318 23.53L16.2707 23.5066C16.2635 23.5044 16.2582 23.5055 16.2547 23.51L16.252 23.5166L16.2407 23.802L16.244 23.8153L16.2507 23.824L16.32 23.8733L16.33 23.876L16.338 23.8733L16.4073 23.824L16.4153 23.8133L16.418 23.802L16.4067 23.5173C16.4049 23.5102 16.4011 23.5062 16.3953 23.5053ZM16.572 23.43L16.5633 23.4313L16.44 23.4933L16.4333 23.5L16.4313 23.5073L16.4433 23.794L16.4467 23.802L16.452 23.8066L16.586 23.8686C16.5944 23.8709 16.6009 23.8691 16.6053 23.8633L16.608 23.854L16.5853 23.4446C16.5831 23.4366 16.5787 23.4318 16.572 23.43ZM16.0953 23.4313C16.0924 23.4295 16.0889 23.429 16.0855 23.4297C16.0822 23.4304 16.0792 23.4325 16.0773 23.4353L16.0733 23.4446L16.0507 23.854C16.0511 23.862 16.0549 23.8673 16.062 23.87L16.072 23.8686L16.206 23.8066L16.2127 23.8013L16.2153 23.794L16.2267 23.5073L16.2247 23.4993L16.218 23.4926L16.0953 23.4313Z" fill="#242424"></path>
      <path d="M15 21.3333C15 21.5985 15.1053 21.8529 15.2929 22.0404C15.4804 22.228 15.7347 22.3333 16 22.3333C16.2652 22.3333 16.5195 22.228 16.7071 22.0404C16.8946 21.8529 17 21.5985 17 21.3333V17H21.3333C21.5985 17 21.8529 16.8946 22.0404 16.7071C22.2279 16.5196 22.3333 16.2652 22.3333 16C22.3333 15.7348 22.2279 15.4804 22.0404 15.2929C21.8529 15.1053 21.5985 15 21.3333 15H17V10.6667C17 10.4014 16.8946 10.1471 16.7071 9.95955C16.5195 9.77201 16.2652 9.66666 16 9.66666C15.7347 9.66666 15.4804 9.77201 15.2929 9.95955C15.1053 10.1471 15 10.4014 15 10.6667V15H10.6666C10.4014 15 10.1471 15.1053 9.95952 15.2929C9.77198 15.4804 9.66663 15.7348 9.66663 16C9.66663 16.2652 9.77198 16.5196 9.95952 16.7071C10.1471 16.8946 10.4014 17 10.6666 17H15V21.3333Z" fill="#242424" stroke="#242424"></path>
      </svg>,
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
      <g clip-path="url(#clip0_1067_15797)">
      <path d="M11.8086 8.01421C11.2908 8.06221 10.9846 8.17101 10.5906 8.44621C10.2877 8.65741 10.0662 8.90701 9.86106 9.27181C9.72102 9.52461 9.65263 9.80941 9.6103 10.2958L9.5875 10.5742H8.53233C7.3534 10.5742 7.34689 10.5742 7.14823 10.7918C7.0147 10.9358 6.97562 11.0734 6.99842 11.3134C7.01796 11.5086 7.14497 11.6782 7.35014 11.7806C7.49018 11.851 7.51949 11.8542 8.5421 11.8542H9.59076L9.61355 12.1326C9.64612 12.5678 9.71451 12.8398 9.85455 13.1182C10.1607 13.7198 10.6948 14.1486 11.3722 14.3374C11.6653 14.4206 13.7528 14.443 14.1925 14.3662C14.9155 14.2446 15.544 13.7838 15.8827 13.1182C16.0879 12.715 16.1139 12.5486 16.1335 11.4606C16.1595 10.0622 16.0977 9.64301 15.8078 9.15661C15.4659 8.59341 14.8992 8.18381 14.2739 8.05901C14.0003 8.00141 12.2547 7.96941 11.8086 8.01421ZM13.6551 9.29101C14.0101 9.31341 14.1045 9.33261 14.2413 9.39981C14.453 9.50861 14.6224 9.68461 14.7331 9.91821L14.8243 10.1102V11.2142V12.3182L14.7331 12.5134C14.6224 12.747 14.4693 12.9006 14.2218 13.0254L14.0427 13.1182H12.8703C11.7206 13.1182 11.6946 13.1182 11.548 13.0446C11.307 12.9294 11.1409 12.7662 11.0237 12.5326L10.9162 12.3182V11.2302C10.9162 9.96941 10.9227 9.92461 11.1963 9.63341C11.4145 9.39661 11.6034 9.31981 12.0398 9.29421C12.5478 9.26221 13.1731 9.26221 13.6551 9.29101Z" fill="#2C2C2C"></path>
      <path d="M17.853 10.6215C17.3417 10.8423 17.3548 11.5943 17.8758 11.8087C17.9833 11.8503 18.3383 11.8567 20.745 11.8567H23.4904L23.6337 11.7831C23.917 11.6423 24.0408 11.3735 23.9789 11.0407C23.9528 10.9031 23.7574 10.6791 23.6109 10.6183C23.4578 10.5575 17.9996 10.5575 17.853 10.6215Z" fill="#2C2C2C"></path>
      <path d="M16.7457 16.6433C16.0618 16.7681 15.4202 17.2513 15.0978 17.8881C14.8926 18.2945 14.8698 18.4609 14.8503 19.5457C14.8308 20.5825 14.8633 21.0593 14.9741 21.4113C15.2118 22.1697 15.8762 22.7585 16.7131 22.9473C16.9411 23.0017 17.117 23.0081 18.0972 23.0081C19.0612 23.0081 19.2599 22.9985 19.4944 22.9505C20.2108 22.8001 20.7873 22.3649 21.1097 21.7345C21.2693 21.4177 21.3377 21.1585 21.3735 20.7105L21.3963 20.4321H22.4515C23.6304 20.4321 23.6369 20.4321 23.8356 20.2145C23.9691 20.0705 24.0082 19.9329 23.9854 19.6929C23.9658 19.4977 23.8388 19.3281 23.6336 19.2225C23.4936 19.1553 23.4643 19.1521 22.4417 19.1521H21.393L21.3702 18.8705C21.3214 18.2561 21.1944 17.9073 20.8752 17.4977C20.5691 17.1041 20.1262 16.8097 19.6116 16.6689C19.3348 16.5889 17.143 16.5697 16.7457 16.6433ZM19.4357 17.9617C19.6767 18.0769 19.8428 18.2401 19.9601 18.4737L20.0675 18.6881V19.7921V20.8961L19.9764 21.0881C19.8656 21.3217 19.6963 21.4977 19.4813 21.6065C19.3348 21.6833 19.2631 21.6929 18.7258 21.7217C18.335 21.7441 17.9311 21.7441 17.5208 21.7217C16.9639 21.6929 16.8955 21.6833 16.7457 21.6065C16.42 21.4433 16.2311 21.1809 16.1725 20.8161C16.1497 20.6689 16.14 20.2369 16.1497 19.6353L16.1595 18.6881L16.2507 18.4961C16.3972 18.1857 16.6643 17.9649 16.9672 17.9041C17.0421 17.8881 17.5957 17.8785 18.1949 17.8817C19.2566 17.8881 19.2892 17.8913 19.4357 17.9617Z" fill="#2C2C2C"></path>
      <path d="M7.36643 19.2132C7.21337 19.2836 7.07658 19.418 7.02773 19.546C6.97888 19.6708 6.98214 19.9332 7.03425 20.058C7.09612 20.1988 7.32409 20.394 7.45436 20.4164C7.51298 20.426 8.80915 20.4292 10.33 20.426L13.0982 20.4164L13.2155 20.3396C13.4272 20.1988 13.489 20.0708 13.489 19.7892C13.489 19.562 13.4825 19.5332 13.3881 19.418C13.336 19.3508 13.2252 19.2644 13.1471 19.2228L13.0038 19.1524H10.2486C7.63999 19.1524 7.49019 19.1556 7.36643 19.2132Z" fill="#2C2C2C"></path>
      </g>
      <defs>
      <clipPath id="clip0_1067_15797">
      <rect width="17" height="15" fill="white" transform="translate(7 8)"></rect>
      </clipPath>
      </defs>
      </svg>,
   <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
    <path d="M16.3838 17.6898C16.7073 17.568 16.9885 17.3664 17.3729 16.9867C17.7432 16.6211 19.0651 15.0274 19.187 14.7977C19.2713 14.643 19.2245 14.2305 19.1026 14.0617C18.8916 13.7617 18.4041 13.6727 18.1041 13.8742C18.0151 13.9305 17.6823 14.3055 17.3588 14.7086L16.7729 15.4398L16.7495 11.0898C16.726 6.76797 16.726 6.73985 16.6276 6.6086C16.2854 6.14922 15.7135 6.14922 15.3713 6.6086C15.2729 6.73985 15.2729 6.76329 15.2588 11.0992L15.2495 15.4586L14.6495 14.718C14.3213 14.3148 13.9838 13.9305 13.8948 13.8742C13.5948 13.6727 13.1073 13.7617 12.8963 14.0617C12.7745 14.2305 12.7276 14.643 12.812 14.7977C12.8448 14.8586 13.1776 15.2852 13.5526 15.7539C14.7338 17.2258 15.2963 17.6945 15.9245 17.732C16.0979 17.7461 16.2807 17.7273 16.3838 17.6898Z" fill="#242424"></path>
    <path d="M6.8965 13.2815C6.68087 13.3471 6.49806 13.5065 6.42306 13.6987C6.23556 14.1627 6.20744 15.8737 6.36681 16.9658C6.94806 20.9362 9.60119 24.1612 13.2387 25.319C16.7824 26.4487 20.6777 25.2955 23.1856 22.3799C25.0277 20.233 25.9559 17.3315 25.7074 14.5002C25.6231 13.5627 25.4777 13.3283 24.9481 13.2908C24.6012 13.2674 24.3949 13.3846 24.2496 13.6799C24.1512 13.8815 24.1512 13.9096 24.2074 14.5096C24.2731 15.2268 24.2402 16.2205 24.1324 16.8908C23.5043 20.7487 20.6168 23.7018 16.9887 24.1846C13.8012 24.6065 10.6184 22.9471 8.94025 19.9799C8.03087 18.3721 7.61369 16.3893 7.79181 14.4862C7.85275 13.8815 7.84806 13.8533 7.75431 13.6705C7.59962 13.3612 7.20587 13.183 6.8965 13.2815Z" fill="#242424"></path>
    </svg>,
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
      <path d="M7.99963 7H23.9997C24.552 7 24.9997 7.44764 24.9997 7.99987L24.9999 9.58569C25 9.85097 24.8946 10.1054 24.707 10.293L18.2925 16.7071C18.105 16.8946 17.9996 17.149 17.9996 17.4142V23.7192C17.9996 24.3698 17.3882 24.8472 16.7571 24.6894L14.7571 24.1894C14.3119 24.0781 13.9996 23.6781 13.9996 23.2192V17.4142C13.9996 17.149 13.8943 16.8946 13.7067 16.7071L7.29252 10.2929C7.10498 10.1054 6.99963 9.851 6.99963 9.58579V8C6.99963 7.44772 7.44734 7 7.99963 7Z" stroke="#242424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>,
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
      <path d="M17.5147 17.9072C18.9978 16.975 21.0206 17.1652 22.3711 18.2363C22.4859 18.3321 22.5951 18.4328 22.7031 18.5362C22.7279 18.5588 22.7528 18.5812 22.7783 18.6045C22.9983 18.8126 23.1682 19.0488 23.335 19.2998C23.3558 19.3308 23.3769 19.3617 23.3984 19.3936C23.9742 20.3096 24.131 21.5191 23.8945 22.5684C23.6999 23.339 23.3178 24.0104 22.7695 24.583C22.736 24.6197 22.7355 24.6197 22.7012 24.6572C22.1888 25.1989 21.4884 25.5498 20.7764 25.7451C20.7374 25.7564 20.6984 25.7677 20.6582 25.7793C19.605 26.0296 18.449 25.813 17.5205 25.2803C17.2315 25.0976 16.9696 24.8858 16.7227 24.6494C16.6855 24.6154 16.6854 24.6148 16.6475 24.5801C16.4277 24.3721 16.2585 24.1357 16.0918 23.8848C16.0709 23.8538 16.0498 23.823 16.0283 23.791C15.4525 22.875 15.2957 21.6656 15.5322 20.6162C15.7268 19.8458 16.1083 19.1751 16.6563 18.6026C16.6789 18.5778 16.7022 18.5529 16.7256 18.5274C16.9337 18.3074 17.1698 18.1375 17.4209 17.9707C17.4519 17.9499 17.4828 17.9288 17.5147 17.9072ZM21.1084 9.89846C21.2945 9.87341 21.4524 9.8725 21.624 9.95217C21.759 10.0804 21.8354 10.1694 21.8477 10.3594C21.8449 10.3935 21.8427 10.4277 21.8398 10.4629C21.8624 10.467 21.8849 10.4714 21.9082 10.4756C22.3351 10.5664 22.7462 10.7651 23.0693 11.0606C23.099 11.0872 23.1286 11.1142 23.1592 11.1416C23.6371 11.5929 23.9601 12.2235 23.9795 12.8877C23.9802 12.9739 23.9798 13.0603 23.9795 13.1465C23.9797 13.1942 23.9802 13.2423 23.9805 13.2901V13.999C23.9809 14.2532 23.9818 14.5076 23.9814 14.7617C23.9811 15.0235 23.9815 15.2852 23.9824 15.5469C23.9832 15.7723 23.9826 15.9982 23.9824 16.2237C23.9823 16.3578 23.9828 16.4919 23.9834 16.626V17.1436C23.9864 17.5752 23.9861 17.5754 23.833 17.7393C23.7062 17.8596 23.6045 17.8824 23.4346 17.8887C23.2647 17.8824 23.1629 17.8596 23.0361 17.7393C22.5686 17.038 22.9033 16.0567 22.9033 15.2139H9.08106C9.08517 16.5206 9.08952 17.8275 9.09375 19.1738C9.09488 19.5862 9.0965 19.999 9.09766 20.4238C9.09898 20.7938 9.09918 20.794 9.10059 21.1641C9.10121 21.3287 9.10123 21.4936 9.10157 21.6582C9.102 21.8685 9.10255 22.0789 9.10352 22.2891C9.10382 22.3659 9.10442 22.4427 9.1045 22.5196C9.10522 23.2018 9.10848 23.7979 9.60938 24.3155C10.0525 24.7299 10.5886 24.7542 11.165 24.7539C11.2135 24.754 11.262 24.7548 11.3106 24.7549C11.4151 24.7552 11.5204 24.7548 11.625 24.7549C11.7904 24.7551 11.9557 24.7562 12.1211 24.7569C12.1779 24.7571 12.2352 24.7566 12.292 24.7569C12.3203 24.757 12.3488 24.7577 12.3779 24.7578C12.7627 24.7592 13.1475 24.7604 13.5322 24.7608C13.7923 24.761 14.0524 24.7614 14.3125 24.7627C14.45 24.7634 14.5881 24.7639 14.7256 24.7637C14.8545 24.7635 14.9834 24.7637 15.1123 24.7647C15.1596 24.7649 15.2076 24.7649 15.2549 24.7647C15.697 24.7626 15.6971 24.7632 15.8594 24.916C15.9797 25.0428 16.0025 25.1446 16.0088 25.3145C16.0025 25.4844 15.9798 25.5861 15.8594 25.7129C15.713 25.8271 15.6187 25.8621 15.4336 25.8623C15.4009 25.8626 15.4007 25.863 15.3672 25.8633C15.2943 25.8638 15.2214 25.8637 15.1484 25.8633C15.0959 25.8635 15.0428 25.864 14.9902 25.8643C14.8477 25.8649 14.705 25.8637 14.5625 25.8633C14.4129 25.863 14.2629 25.8641 14.1133 25.8643C13.8617 25.8645 13.61 25.8639 13.3584 25.8633C13.0687 25.8626 12.779 25.8626 12.4893 25.8633C12.2397 25.8639 11.9898 25.8646 11.7402 25.8643C11.5915 25.8641 11.4427 25.8638 11.2939 25.8643C11.1537 25.8647 11.0133 25.8641 10.8731 25.8633C10.8221 25.8631 10.7707 25.863 10.7197 25.8633C10.2776 25.8656 9.86291 25.7965 9.46778 25.586C9.44575 25.5746 9.42308 25.5635 9.40039 25.5518C9.22299 25.4577 9.06685 25.3463 8.91504 25.2149C8.88878 25.1951 8.863 25.1747 8.83594 25.1543C8.36135 24.754 8.07031 24.1132 8.00586 23.503C8.00133 23.3844 8.00012 23.2661 8.00098 23.1475V22.6426C8.00128 22.5095 8.00037 22.3763 8 22.2432C7.99941 21.9829 7.99962 21.7222 8 21.4619C8.0003 21.2503 8.00112 21.0388 8.00098 20.8272C8.00096 20.797 8.00002 20.7665 8 20.7354C7.99996 20.674 8.00005 20.6122 8 20.5508C7.99963 19.9763 8.00026 19.4017 8.00098 18.8272C8.00157 18.335 8.00159 17.8428 8.00098 17.3506C8.00027 16.7778 7.9996 16.2046 8 15.6319C8.00005 15.5708 8.00094 15.5094 8.00098 15.4483C8.001 15.4183 8.00096 15.3883 8.00098 15.3574C8.00109 15.1462 8.00032 14.9349 8 14.7237C7.99963 14.466 8.00027 14.2079 8.00098 13.9502V13.0049C8.00449 12.611 8.09189 12.2285 8.27832 11.8789C8.28982 11.8568 8.30066 11.8343 8.3125 11.8115C8.40724 11.6339 8.51331 11.4761 8.64942 11.3272C8.67599 11.2976 8.7031 11.2678 8.73047 11.2373C9.11367 10.8314 9.59406 10.5639 10.1445 10.4629C10.1418 10.4288 10.1395 10.3946 10.1367 10.3594C10.149 10.1695 10.2255 10.0803 10.3604 9.95217C10.532 9.8725 10.6899 9.87341 10.876 9.89846C11.0382 9.97387 11.1257 10.0721 11.208 10.2305V10.4297H12.8027V10.2305C12.8851 10.0721 12.9725 9.97388 13.1348 9.89846C13.3208 9.87341 13.4788 9.8725 13.6504 9.95217C13.7428 10.04 13.8072 10.117 13.8662 10.2305V10.4297H15.4609V10.2305C15.5433 10.072 15.6306 9.97389 15.793 9.89846C15.9789 9.87342 16.1361 9.87258 16.3076 9.95217C16.4002 10.0401 16.4644 10.1169 16.5234 10.2305V10.4297H18.1182V10.2305C18.2006 10.072 18.2887 9.97389 18.4512 9.89846C18.6371 9.87345 18.7943 9.87253 18.9658 9.95217C19.0584 10.0401 19.1226 10.1169 19.1816 10.2305V10.4297H20.7764V10.2305C20.8587 10.0722 20.9463 9.97386 21.1084 9.89846ZM20.7725 18.584C19.6714 18.2221 18.4439 18.437 17.5869 19.2334C17.5579 19.2601 17.5289 19.2869 17.499 19.3145C16.9802 19.8123 16.5931 20.5257 16.5518 21.2549C16.5363 21.88 16.5358 21.8802 16.6563 22.4893C16.6675 22.5246 16.6788 22.5603 16.6904 22.5967C16.9879 23.4377 17.5904 24.0873 18.3828 24.4873C19.143 24.8501 20.0225 24.861 20.8096 24.583C21.6472 24.2416 22.3054 23.6182 22.667 22.7852C22.9705 21.981 22.9707 21.079 22.6172 20.291C22.2291 19.5094 21.6032 18.8819 20.7725 18.584ZM11.4082 22.124C11.5703 22.1993 11.6649 22.2941 11.7402 22.4561C11.7653 22.6421 11.7662 22.8001 11.6865 22.9717C11.5347 23.1315 11.431 23.1958 11.209 23.2041C10.9867 23.1959 10.8824 23.1317 10.7305 22.9717C10.6508 22.8001 10.6517 22.6421 10.6768 22.4561C10.8256 22.1359 11.081 22.08 11.4082 22.124ZM14.5977 22.124C14.7598 22.1993 14.8544 22.2941 14.9297 22.4561C14.9547 22.6421 14.9557 22.8001 14.876 22.9717C14.7241 23.1316 14.6205 23.1958 14.3984 23.2041C14.1763 23.1959 14.0727 23.1314 13.9209 22.9717C13.8412 22.8001 13.8412 22.6421 13.8662 22.4561C14.015 22.1359 14.2704 22.08 14.5977 22.124ZM19.9131 19.4668C20.0779 19.5434 20.1585 19.6409 20.2451 19.7988C20.2623 19.8979 20.2614 19.9945 20.2588 20.0947C20.2586 20.1225 20.258 20.1502 20.2578 20.1787C20.2571 20.2666 20.2556 20.3545 20.2539 20.4424C20.2532 20.5022 20.2525 20.5623 20.252 20.6221C20.2505 20.7684 20.2479 20.9152 20.2451 21.0615C20.2662 21.0608 20.2878 21.0603 20.3096 21.0596C20.4059 21.0568 20.5023 21.0554 20.5986 21.0537C20.6318 21.0526 20.665 21.051 20.6992 21.0498C20.9038 21.0471 21.0202 21.0578 21.1758 21.1944C21.2962 21.3211 21.3189 21.423 21.3252 21.5928C21.3189 21.7628 21.2963 21.8653 21.1758 21.9922C21.001 22.1391 20.8628 22.1445 20.6445 22.1426H19.8467C19.8164 22.1429 19.7861 22.1433 19.7549 22.1436C19.5217 22.1401 19.4024 22.0817 19.2373 21.9121C19.1517 21.7265 19.1637 21.5458 19.165 21.3438C19.1649 21.3004 19.1642 21.2567 19.1641 21.2119C19.1639 21.1202 19.1644 21.0283 19.165 20.9365V20.2481C19.1648 20.2061 19.1643 20.1634 19.1641 20.1201C19.1679 19.7599 19.168 19.7597 19.3154 19.5996C19.4905 19.4334 19.6843 19.436 19.9131 19.4668ZM10.6768 19.7988C10.8255 19.4784 11.0808 19.4228 11.4082 19.4668C11.5702 19.5421 11.665 19.6367 11.7402 19.7988C11.7652 19.9847 11.7661 20.1421 11.6865 20.3135C11.5347 20.4733 11.431 20.5376 11.209 20.5459C10.9867 20.5377 10.8824 20.4735 10.7305 20.3135C10.6509 20.1421 10.6518 19.9847 10.6768 19.7988ZM13.8662 19.7988C14.015 19.4784 14.2703 19.4228 14.5977 19.4668C14.7597 19.5421 14.8544 19.6367 14.9297 19.7988C14.9547 19.9847 14.9555 20.142 14.876 20.3135C14.7241 20.4734 14.6205 20.5376 14.3984 20.5459C14.1762 20.5377 14.0728 20.4733 13.9209 20.3135C13.8413 20.142 13.8412 19.9848 13.8662 19.7988ZM11.4082 16.8086C11.5703 16.8839 11.6649 16.9785 11.7402 17.1406C11.7653 17.3265 11.766 17.4839 11.6865 17.6553C11.5347 17.8151 11.431 17.8794 11.209 17.8877C10.9867 17.8795 10.8824 17.8153 10.7305 17.6553C10.651 17.4839 10.6517 17.3265 10.6768 17.1406C10.8255 16.8202 11.0808 16.7645 11.4082 16.8086ZM14.5977 16.8086C14.7598 16.8839 14.8544 16.9785 14.9297 17.1406C14.9547 17.3265 14.9555 17.4838 14.876 17.6553C14.7241 17.8152 14.6205 17.8794 14.3984 17.8877C14.1762 17.8795 14.0728 17.8152 13.9209 17.6553C13.8413 17.4837 13.8412 17.3266 13.8662 17.1406C14.015 16.8202 14.2703 16.7645 14.5977 16.8086ZM11.1416 11.7588C11.0659 11.8749 11.0039 11.9402 10.876 11.9912C10.6925 12.0132 10.5286 12.0141 10.3584 11.9395C10.2583 11.8393 10.2238 11.759 10.1777 11.626C9.86565 11.6743 9.61088 11.8862 9.41407 12.124C8.9732 12.7339 9.08102 13.4047 9.08106 14.1504H22.9033C22.9556 12.9287 22.9548 12.9284 22.3984 11.9512C22.2328 11.7967 22.0445 11.626 21.8066 11.626C21.799 11.644 21.7911 11.6622 21.7832 11.6807L21.7188 11.8233C21.6593 11.9123 21.6046 11.9463 21.5078 11.9912C21.3235 12.0188 21.1594 12.0157 20.9902 11.9356C20.8384 11.7915 20.8116 11.7042 20.7764 11.4932H19.1816C19.1597 11.5808 19.1378 11.6686 19.1152 11.7588C19.0395 11.8749 18.9777 11.9402 18.8496 11.9912C18.6646 12.0134 18.5017 12.0159 18.332 11.9356C18.1803 11.7916 18.1534 11.7042 18.1182 11.4932H16.5234C16.5015 11.5808 16.4796 11.6686 16.457 11.7588C16.3814 11.8748 16.3195 11.9402 16.1914 11.9912C16.0066 12.0134 15.8443 12.0157 15.6748 11.9356C15.523 11.7916 15.4961 11.7042 15.4609 11.4932H13.8662C13.8443 11.5808 13.8224 11.6685 13.7998 11.7588C13.7241 11.875 13.6613 11.9402 13.5332 11.9912C13.3484 12.0133 13.1861 12.0158 13.0166 11.9356C12.8648 11.7915 12.8379 11.7042 12.8027 11.4932H11.208L11.1416 11.7588Z" fill="black"></path>
      </svg>
  ];

  const accentColor = isLogoToggled ? "#7029CF" : "#00FF8B";

  const colDefs = [
    { label: "ID", thW: 130, wrap: false },
    { label: "LOB", thW: 110, wrap: true },
    { label: "Location", thW: 110, wrap: true },
    { label: "Country", thW: 100, wrap: true },
    { label: "City", thW: 100, wrap: true },
    { label: "Area", thW: 110, wrap: true },
    { label: "Gross", thW: 100, wrap: true },
    { label: "Net", thW: 100, wrap: true },
    { label: "Contract Duration", thW: 180, wrap: true },
    { label: "Contract End", thW: 130, wrap: true },
    { label: "Launch Date", thW: 110, wrap: true },
    { label: "Action", thW: 110, wrap: false },
  ];

  const thStyle = (w: number): React.CSSProperties => ({
    width: w, minWidth: w, maxWidth: w,
    height: 48, paddingBottom: 16,
    whiteSpace: "nowrap", overflow: "hidden",
    textOverflow: "ellipsis", boxSizing: "border-box",
    fontWeight: "600"
  });

  const tdStyle = (w: number, wrap: boolean, isRed: boolean): React.CSSProperties => ({
    width: w, minWidth: w, maxWidth: w,
    whiteSpace: wrap ? "normal" : "nowrap",
    wordBreak: wrap ? "break-word" : "normal",
    overflowWrap: wrap ? "break-word" : "normal",
    overflow: "hidden", boxSizing: "border-box",
    color: isRed ? "#FA6E6E" : "#555555",
  });

  // ── Action Buttons — table-type aware ─────────────────────────────────────────
  const ActionButtons = ({ row, tableType }: { row: PropertyRow; tableType: "active" | "inactive" }) => {
    const publishColor = tableType === "active" ? "#7029CF" : "#CACACA";
    return (
      <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
        {/* Publish/Unpublish button */}
        <button
          onClick={() => tableType === "active" ? setUnpublishModalRow(row) : setPublishModalRow(row)}
          style={{ background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s", lineHeight: 0 }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.13593 5.81903L12.72 3.13548C13.0955 3.03035 13.4415 3.37632 13.3363 3.75178L10.6528 13.3359C10.5262 13.788 9.90272 13.8321 9.71365 13.4025L7.76177 8.96635C7.7114 8.85187 7.61996 8.76043 7.50548 8.71006L3.06938 6.75817C2.63969 6.56911 2.68387 5.94561 3.13593 5.81903Z"
              fill={publishColor} stroke={publishColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Edit button */}
        <button style={{ background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s", lineHeight: 0 }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M13.0413 5.12732C13.2799 4.89028 13.5047 4.65913 13.678 4.47498C13.8526 4.28936 13.97 4.15611 14.0012 4.10974C14.3025 3.6533 14.3183 3.02708 14.0432 2.54529C14.0328 2.52729 13.9955 2.48069 13.9309 2.40759C13.8685 2.33691 13.785 2.24615 13.6868 2.14197C13.4903 1.93348 13.2359 1.67257 12.9778 1.41248C12.7197 1.15239 12.4579 0.893262 12.2454 0.689819C12.1392 0.588184 12.0453 0.500954 11.9709 0.43396C11.8952 0.365728 11.8431 0.321734 11.8176 0.305054C11.4988 0.0959799 11.0707 0.019202 10.6995 0.0950928L10.5442 0.137085C10.4358 0.173226 10.2787 0.246095 10.2004 0.298218L10.1995 0.299194L10.0784 0.39978C10.0166 0.454899 9.9376 0.52882 9.84595 0.615601C9.66252 0.789291 9.43011 1.01523 9.19458 1.25232L8.38208 2.06482L10.3137 3.99255L12.2415 5.92517L13.0413 5.12732Z" fill="#00A394" stroke="#7029CF" strokeWidth="0.133333" />
            <path d="M4.04756 6.30525C0.30381 10.0552 0.413185 9.9365 0.306935 10.3334C0.24131 10.5771 -0.0149401 12.9459 0.000684889 13.1896C0.0288099 13.7459 0.431935 14.1834 1.01318 14.2896C1.16943 14.3177 1.37881 14.3021 2.47568 14.1771C3.90381 14.0146 3.98506 14.0021 4.27256 13.8677C4.46006 13.7771 4.72256 13.524 8.00693 10.2459L11.5382 6.72087L9.56943 4.75212C8.48818 3.67087 7.59443 2.78337 7.58506 2.78337C7.57568 2.78337 5.98506 4.36775 4.04756 6.30525Z" fill="#00A394" />
          </svg>
        </button>
        {/* Delete button — Inactive only */}
        {tableType === "inactive" && (
          <button onClick={() => setDeleteModalRow(row)}
            style={{ background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s", lineHeight: 0 }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" fill="#E46464"></path>
              <path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" stroke="#E46464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M14 3.99992H10.25M2 3.99992H5.75M5.75 3.99992V2.66659C5.75 1.93021 6.34695 1.33325 7.08333 1.33325H8.91667C9.65307 1.33325 10.25 1.93021 10.25 2.66659V3.99992M5.75 3.99992H10.25" stroke="#E46464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
          </button>
        )}
      </div>
    );
  };

  // ── Dashed separator row ─────────────────────────────────────────────────────
  const DashSeparator = ({ colCount }: { colCount: number }) => (
    <tr aria-hidden="true">
      <td colSpan={colCount + 1} style={{ padding: "6px 0" }}>
        <div style={{ height: "1px", backgroundImage: "repeating-linear-gradient(to right, #CACACA 0, #CACACA 6px, transparent 6px, transparent 11px)" }} />
      </td>
    </tr>
  );

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="notifClip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.90 C0 0.98 0.015 1 0.035 1 H0.5348 H0.9638 C0.985 1 1 0.98 1 0.90 V0.24 C1 0.24 1 0.14 0.9638 0.14 H0.5701 C0.548 0.14 0.5348 0.10 0.5348 0.06 C0.5348 0.03 0.52 0 0.5 0 H0.035 C0.015 0 0 0.03 0 0.06 V0.90 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="flex w-full h-full bg-[#F7F7F7]"
        style={{ padding: "30px 64px", position: "relative", fontFamily: "GT Walsheim", fontWeight: "600" }}
      >
        {/* Floating Icons RIGHT */}
        <div style={{ position: "absolute", right: "16px", top: "38%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "8px", zIndex: 30 }}>
          {sideIcons.map((icon, i) => {
            const handleClick = i === 0
              ? () => { setAddForm({ id: "", lob: "", location: "", country: "", city: "", area: "", gross: "", net: "", duration: "", end: "", launch: "" }); setAddError(""); setShowAddModal(true); }
              : i === 2
                ? () => setShowExportModal(true)
                : undefined;
            return (
              <button key={i} onClick={handleClick}
                style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", transition: "transform 0.2s", padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                {icon}
              </button>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="absolute top-[4%] right-[4%] md:right-[4%] lg:right-[6%] xl:right-[14%] z-40">
          <div className="flex bg-[#FFFFFF] rounded-full py-4 px-7 md:px-8 lg:px-9 xl:px-10 shadow-inner">
            {["Property Directory", "Settings", "Custom Lists"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-full text-xs transition-all duration-300 ${activeTab === tab ? "bg-[#7029CF8F] text-[#242424] shadow-md" : "text-[#7029CF] hover:bg-[#E0CCFF]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main White Card */}
        <div className="flex flex-col" style={{ position: "relative", flex: 1, width: "100%", height: "100%", minHeight: 720, padding: "40px 27px 62px 28px", backgroundColor: "white", clipPath: "url(#notifClip)", WebkitClipPath: "url(#notifClip)", overflow: "hidden", boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-10" style={{ width: "calc(100% - 48%)", paddingRight: 0 }}>
            <h2 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: "500", fontSize: "24px", color: "#7029CF", paddingLeft: "22px", flexShrink: 0 }}>
              {activeTab}
            </h2>
            <div className="flex items-center" style={{ flexShrink: 0 }}>
              <div className="flex items-center" style={{ position: "relative" }}>
                <button
                  onClick={() => setIsLogoToggled(prev => !prev)}
                  style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: isLogoToggled ? "#7029CF" : "#000", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", cursor: "pointer", zIndex: 20, position: "relative", transition: "background-color 0.3s", flexShrink: 0 }}
                >
                  <Image src="/cards/logogreen.svg" alt="Xlogo" width={14} height={14} />
                </button>
                <div className={styles.line} />
                <div style={{ position: "relative", borderRadius: 9999, background: isLogoToggled ? "#7029CF" : "rgba(255,255,255,0.2)", zIndex: 20, marginLeft: -4, transition: "background 0.3s" }}>
                  <div style={{ position: "relative", borderRadius: 9999, padding: "7px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, backgroundColor: isLogoToggled ? "#7029CF" : "#000", transition: "background-color 0.3s" }}>
                    <div style={{ position: "absolute", inset: 3, borderRadius: 9999, border: "1px solid #808080", pointerEvents: "none" }} />
                    <span onClick={() => setStatusFilter("Active")} style={{ cursor: "pointer", position: "relative", zIndex: 10, color: statusFilter === "Active" ? accentColor : "#808080", transition: "color 0.3s" }}>
                      Active
                      {statusFilter === "Active" && <span style={{ position: "absolute", bottom: 2, left: 0, right: 0, height: 1.5, backgroundColor: accentColor, borderRadius: 2, display: "block", transition: "background-color 0.3s" }} />}
                    </span>
                    <span style={{ color: "#808080", fontWeight: 300, zIndex: 10 ,}}>|</span>
                    <span onClick={() => setStatusFilter("Inactive")} style={{ cursor: "pointer", position: "relative", zIndex: 10, color: statusFilter === "Inactive" ? accentColor : "#808080", transition: "color 0.3s" }}>
                      Inactive
                      {statusFilter === "Inactive" && <span style={{ position: "absolute", bottom: 2, left: 0, right: 0, height: 1.5, backgroundColor: accentColor, borderRadius: 2, display: "block", transition: "background-color 0.3s" }} />}
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 bg-[#555555] rounded-full px-1.5 py-2 text-[#B1B1B1] hover:bg-[#555] transition-colors" style={{ flexShrink: 0, fontFamily: "GT Walsheim", fontWeight: "600", fontSize: "12px", position: "relative" }}>
                <div style={{ position: "absolute", inset: 3, borderRadius: 9999, border: "1px solid #808080", pointerEvents: "none" }} />
                Archived
                <Image src="/cards/archive.svg" alt="archive" width={14} height={14} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: "none", overflowY: "hidden" }}>
            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 36 }} />
                {colDefs.map((c, i) => <col key={i} style={{ width: c.thW, minWidth: c.thW }} />)}
              </colgroup>
              <thead style={{ color: "#7029CF", fontSize: 16, fontWeight: 600, fontFamily: "GT Walsheim", textAlign: "center" }}>
                <tr>
                  <th style={{ width: 36, paddingBottom: 16 }} />
                  {colDefs.map((c, i) => <th key={i} style={thStyle(c.thW)}>{c.label}</th>)}
                </tr>
                <tr aria-hidden="true">
                  <td colSpan={colDefs.length + 1} style={{ padding: 0, height: 0 }}>
                    <div style={{ borderTop: "1.5px solid #B1B1B1", margin: "0 4px 8px" }} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop, idx) => {
                  const isExpanded = expandedRow === idx;
                  const isEndMissing = !prop.end || prop.end.trim() === "";
                  const endDate = isEndMissing ? null : new Date(prop.end);
                  const today = new Date(); today.setHours(0, 0, 0, 0);
                  const isEndRed = isEndMissing || (endDate !== null && endDate < today);
                  const isLast = idx === properties.length - 1;
                  // Stable unique key per row: id + absolute index
                  const rowKey = `${prop.id}__${pageStart + idx}`;

                  return (
                    <React.Fragment key={rowKey}>
                      <tr
                        style={{ backgroundColor: "transparent", cursor: "pointer" }}
                        onClick={() => setExpandedRow(isExpanded ? null : idx)}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <td style={{ padding: "10px 0 10px 8px", width: 36, borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px" }}>
                          <div style={{ width: 20, height: 20, backgroundColor: "#7029CF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                        <td style={{ padding: "10px 8px", width: 110, borderTopRightRadius: "9999px", borderBottomRightRadius: "9999px" }} onClick={e => e.stopPropagation()}>
                          <ActionButtons row={prop} tableType={statusFilter === "Active" ? "active" : "inactive"} />
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr style={{ backgroundColor: "#F1EAFA" }}>
                          <td style={{ padding: "10px 0 10px 32px", width: 36, borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px" }} />
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
                          <td style={{ padding: "10px 8px", width: 110, borderTopRightRadius: "9999px", borderBottomRightRadius: "9999px" }}>
                            <ActionButtons row={prop} tableType={statusFilter === "Active" ? "active" : "inactive"} />
                          </td>
                        </tr>
                      )}

                      {!isLast && <DashSeparator colCount={colDefs.length} />}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M15.707 5.293a1 1 0 010 1.414L12.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /><path d="M9.707 5.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-[#999]">…</span>
                ) : (
                  <button key={p} onClick={() => handlePageChange(p as number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentPage === p ? "bg-[#7029CF] text-white shadow-md" : "text-[#666] hover:bg-[#F0E6FF] hover:text-[#7029CF]"}`}
                  >{p}</button>
                )
              )}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40">
                <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
              <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40">
                <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path d="M15.707 5.293a1 1 0 010 1.414L12.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /><path d="M9.707 5.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#999] font-medium">
                Displaying {pageStart + 1} – {Math.min(pageEnd, allProperties.length)} of {allProperties.length} records
              </span>
              <button onClick={() => { setCurrentPage(1); }} className="bg-[#E5E5E5] px-6 py-2 rounded-full text-xs font-bold text-[#666] hover:bg-[#D5D5D5] transition-colors">All</button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Add Property Modal ── */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowAddModal(false)}>
          <div style={{ backgroundColor: "#fff", borderRadius: 24, padding: "36px 40px", width: "min(680px, 92vw)", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 48px rgba(112,41,207,0.18)", position: "relative" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 22, color: "#7029CF", margin: 0 }}>Add New Property</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 22, lineHeight: 1, padding: 4 }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px" }}>
              {([
                { key: "id", label: "ID", placeholder: "e.g. 24CX010" },
                { key: "lob", label: "LOB", placeholder: "e.g. Copolitan X" },
                { key: "location", label: "Location", placeholder: "e.g. Swanlake" },
                { key: "country", label: "Country", placeholder: "e.g. Egypt" },
                { key: "city", label: "City", placeholder: "e.g. Giza" },
                { key: "area", label: "Area", placeholder: "e.g. October" },
                { key: "gross", label: "Gross", placeholder: "e.g. 10,000" },
                { key: "net", label: "Net", placeholder: "e.g. 7,890" },
                { key: "duration", label: "Contract Duration", placeholder: "e.g. 5 yr." },
                { key: "end", label: "Contract End", placeholder: "e.g. 14 Aug 2026" },
                { key: "launch", label: "Launch Date", placeholder: "e.g. 14 Aug 2025" },
              ] as { key: keyof typeof addForm; label: string; placeholder: string }[]).map(({ key, label, placeholder }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#7029CF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                  <input value={addForm[key]} onChange={e => setAddForm(prev => ({ ...prev, [key]: e.target.value }))} placeholder={placeholder}
                    style={{ border: "1.5px solid #E0D4F5", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: "#333", outline: "none", fontFamily: "GT Walsheim", transition: "border-color 0.2s" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#7029CF")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E0D4F5")}
                  />
                </div>
              ))}
            </div>
            {addError && <p style={{ color: "#FA6E6E", fontSize: 12, marginTop: 14, marginBottom: 0 }}>{addError}</p>}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 28 }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: "10px 28px", borderRadius: 999, border: "1.5px solid #E0D4F5", background: "none", color: "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim", transition: "background 0.2s" }} onMouseEnter={e => (e.currentTarget.style.background = "#F7F3FF")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>Cancel</button>
              <button onClick={() => {
                if (!addForm.id.trim() || !addForm.lob.trim() || !addForm.location.trim()) { setAddError("ID, LOB and Location are required."); return; }
                setInactiveRows(prev => [{ ...addForm }, ...prev]);
                setCurrentPage(1);
                setStatusFilter("Inactive");
                setShowAddModal(false);
              }} style={{ padding: "10px 28px", borderRadius: 999, border: "none", background: "#7029CF", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim", boxShadow: "0 2px 12px rgba(112,41,207,0.25)", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>Add Property</button>
            </div>
          </div>
        </div>
      )}


      {/* ── PUBLISH MODAL (Inactive → Active) ── */}
      {publishModalRow !== null && (
        <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setPublishModalRow(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
              <Image src="/cards/X.svg" alt="Close" width={20} height={20} className="opacity-40" />
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                <g clipPath="url(#clip0_publish)">
                  <path d="M173.127 0.288672C173.042 0.315742 172.952 0.278476 172.868 0.309765L4.11754 63.5911C2.26867 64.2865 0.960859 65.96 0.7341 67.9273C0.507342 69.8947 1.39855 71.8205 3.04633 72.9174L40.0424 97.5782L53.5769 154.131C53.6124 154.279 53.7038 154.398 53.7512 154.541C54.9676 158.251 59.6396 159.428 62.4345 156.633L88.9093 130.159L129.609 157.293C132.558 159.27 136.623 157.794 137.607 154.352L179.794 6.69556C180.927 2.72149 177.197 -1.01774 173.127 0.288672ZM66.4051 107.556C65.5318 108.44 65.2688 109.157 64.9626 110.272C64.9587 110.293 64.9496 110.312 64.9457 110.333L59.0612 131.729L50.6772 96.6947L132.354 40.69L66.4051 107.556Z" fill="#7029CF" />
                  <path d="M35.3691 144.607C33.3093 142.548 29.9719 142.547 27.9121 144.607L1.54486 170.975C-0.514952 173.035 -0.514952 176.372 1.54486 178.432C3.60502 180.492 6.9417 180.492 9.00186 178.432L35.3691 152.064C37.4289 150.005 37.4289 146.667 35.3691 144.607Z" fill="#7029CF" />
                  <path d="M35.3691 112.967C33.3093 110.907 29.9719 110.907 27.9121 112.967L1.54486 139.334C-0.514952 141.394 -0.514952 144.731 1.54486 146.791C3.60502 148.851 6.9417 148.851 9.00186 146.791L35.3691 120.424C37.4289 118.364 37.4289 115.027 35.3691 112.967Z" fill="#7029CF" />
                </g>
                <defs><clipPath id="clip0_publish"><rect width="180" height="180" fill="white" /></clipPath></defs>
              </svg>
            </div>
            <h2 className="text-[#242424] mb-4 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Publish</h2>
            <p className="text-[#2C2C2C] mb-2 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              Are you sure you want to<br />publish this location?
            </p>
             <span className="text-[#7029CF] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              {publishModalRow.location}
            </span>
            <div className="flex gap-4 w-full">
              <button onClick={confirmPublish} className="flex-1 bg-[#7029CF] text-white py-3 rounded-[1536px] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
              <button onClick={() => setPublishModalRow(null)} className="flex-1 bg-white text-[#7029CF] py-3 rounded-[1536px] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── UNPUBLISH MODAL (Active → Inactive) ── */}
      {unpublishModalRow !== null && (
        <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setUnpublishModalRow(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
              <Image src="/cards/X.svg" alt="Close" width={20} height={20} className="opacity-40" />
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
             <svg width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.0762 143.344L66.7718 126.908L43.205 109.248L43.0762 143.344Z" fill="#7029CF"></path>
              <path d="M40.1145 44.2148L3.73403 55.9453C-4.70109 58.6523 3.79842 66.6445 3.79842 66.6445L32.2589 90.4277L66.1926 70.3184L40.1145 44.2148Z" fill="#7029CF"></path>
              <path d="M42.7539 98.4199L104.504 145.148C114.291 151.594 116.803 146.437 116.803 146.437L121.117 136.254L124.014 128.197L71.7939 75.9258C59.9461 85.0137 48.9354 93.5215 42.7539 98.4199Z" fill="#7029CF"></path>
              <path d="M156.726 6.76642L69.8635 34.6746L90.9191 55.7508L120.925 37.9617C120.925 37.9617 108.884 47.243 93.9455 58.7801L134.383 99.2567L164.646 15.0164C166.256 10.7625 161.62 5.92853 156.726 6.76642Z" fill="#7029CF"></path>
              <path d="M36.059 11.9238C33.9985 9.86133 30.5858 9.86133 28.461 11.9238C26.3361 13.9863 26.4005 17.4023 28.461 19.5293L149 140.186C151.06 142.248 154.473 142.248 156.598 140.186C158.722 138.123 158.658 134.707 156.598 132.58L36.059 11.9238Z" fill="#7029CF"></path>
              </svg>
            </div>
            <h2 className="text-[#242424] mb-4 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Unpublish</h2>
            <p className="text-[#2C2C2C] mb-2 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              Are you sure you want to<br />unpublish this location?
            </p>
             <span className="text-[#7029CF] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              {unpublishModalRow.location}
            </span>
            <div className="flex gap-4 w-full">
              <button onClick={confirmUnpublish} className="flex-1 bg-[#7029CF] text-white py-3 rounded-[1536px] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
              <button onClick={() => setUnpublishModalRow(null)} className="flex-1 bg-white text-[#7029CF] py-3 rounded-[1536px] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {deleteModalRow !== null && (
        <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setDeleteModalRow(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
              <Image src="/cards/X.svg" alt="Close" width={20} height={20} className="opacity-40" />
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
             <svg width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M61.547 0.624588C58.3265 1.49702 55.5434 3.08327 53.0783 5.42299C50.2554 8.11961 49.1422 10.1024 46.8759 16.725C44.888 22.5941 44.4108 23.5062 42.8602 24.4977C41.8663 25.1322 40.0771 25.2115 22.8217 25.4097C4.41325 25.608 3.81687 25.6477 2.74337 26.4408C0.636145 27.9874 0 29.2564 0 31.7547C0 34.2531 0.636145 35.5221 2.74337 37.0687C3.73735 37.8222 4.49277 37.9015 10.5759 38.0204C16.7386 38.1394 17.2952 38.2187 17.2952 38.8532C17.2952 39.2498 18.647 59.5538 20.2771 83.9424C21.9072 108.371 23.4181 131.173 23.6566 134.663C24.094 141.761 24.6904 144.458 26.6386 148.582C29.4614 154.491 34.153 159.131 40.1566 162.026C46.5181 165.079 45.2855 165 82.5795 165C114.347 165 115.818 164.96 119.039 164.207C131.245 161.272 140.23 150.724 141.184 138.232C141.582 132.601 147.705 39.805 147.705 38.9722C147.705 38.1791 147.904 38.1394 154.424 38.0204C160.507 37.9015 161.263 37.8222 162.257 37.0687C164.364 35.5221 165 34.2531 165 31.7547C165 29.2564 164.364 27.9874 162.257 26.4408C161.183 25.6477 160.587 25.608 142.178 25.4097C124.923 25.2115 123.134 25.1322 122.14 24.4977C120.589 23.5062 120.112 22.5941 118.124 16.725C115.858 10.1024 114.745 8.11961 111.922 5.42299C109.417 3.04361 106.673 1.49702 103.294 0.624588C100.073 -0.208206 64.688 -0.208206 61.547 0.624588ZM101.584 13.4732C103.493 14.4646 104.487 16.0905 105.998 20.5717C106.673 22.6735 107.349 24.6563 107.469 24.8942C107.588 25.2908 102.419 25.4097 82.5 25.4097C62.5807 25.4097 57.412 25.2908 57.5313 24.8942C57.6506 24.6563 58.3265 22.6338 59.0422 20.4527C59.7578 18.2716 60.7518 15.9319 61.2687 15.2577C63.1373 12.7197 62.9783 12.7197 82.5 12.7197C98.9602 12.7197 100.312 12.7594 101.584 13.4732ZM134.982 38.8532C134.982 39.5274 128.899 131.728 128.461 137.359C127.984 143.704 123.452 149.415 117.17 151.556C115.102 152.27 113.353 152.31 82.5 152.31C51.647 152.31 49.8976 152.27 47.8301 151.556C41.5482 149.415 37.0157 143.704 36.5386 137.359C36.1012 131.728 30.0181 39.5274 30.0181 38.8532C30.0181 38.1394 31.6084 38.0998 82.5 38.0998C133.392 38.0998 134.982 38.1394 134.982 38.8532Z" fill="#FA6E6E"></path>
              <path d="M59.0289 58.0627C58.1176 58.7303 56.8706 60.271 56.295 61.5549L55.1919 63.8146V92.3688V120.923L56.295 123.183C57.8778 126.572 60.0362 127.959 63.3936 127.702C66.5112 127.445 68.6216 126.059 69.7727 123.491C70.4442 121.95 70.5401 118.407 70.5401 92.3688C70.5401 59.9629 70.5881 60.7332 67.5184 58.3708C65.2642 56.6247 61.1873 56.522 59.0289 58.0627Z" fill="#FA6E6E"></path>
              <path d="M100.371 57.8081C99.5072 58.2703 98.3082 59.3488 97.7326 60.2219L96.6774 61.8139L96.5335 91.7547C96.4376 118.665 96.4856 121.85 97.205 123.493C98.3561 126.061 100.467 127.447 103.584 127.704C106.75 127.91 108.908 126.677 110.539 123.698C111.546 121.952 111.546 121.233 111.546 92.371C111.546 63.5087 111.546 62.7897 110.539 61.0436C108.476 57.2432 104.112 55.8052 100.371 57.8081Z" fill="#FA6E6E"></path>
              </svg>
            </div>
            <h2 className="text-[#242424] mb-4 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Delete!</h2>
            <p className="text-[#2C2C2C] mb-2 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              Are you sure you want to delete this<br />location &amp; all spaces linked to it?
            </p>
             <span className="text-[#FA6E6E] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              {deleteModalRow.location}
            </span>
            <div className="flex gap-4 w-full">
              <button onClick={confirmDelete} className="flex-1 bg-[#FA6E6E] text-white py-3 rounded-[1536px] hover:opacity-90 transition-all active:scale-95">Confirm</button>
              <button onClick={() => setDeleteModalRow(null)} className="flex-1 bg-white text-[#FA6E6E] py-3 rounded-[1536px] border-2 border-[#FA6E6E] hover:bg-red-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPORT MODAL ── */}
      {showExportModal && (
        <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setShowExportModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
              <Image src="/cards/X.svg" alt="Close" width={20} height={20} className="opacity-40" />
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <svg width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1088_12745)">
                <path d="M130.045 114.893H48.8986C46.5142 114.893 44.5815 112.96 44.5815 110.576V6.73406C44.5815 4.34962 46.5145 2.41699 48.8986 2.41699H130.045C132.43 2.41699 134.362 4.34994 134.362 6.73406V110.576C134.362 112.96 132.43 114.893 130.045 114.893Z" fill="#F8EBFF"></path>
                <path d="M134.365 6.73535V110.576C134.365 112.961 132.431 114.894 130.046 114.894H122.276C124.661 114.894 126.595 112.961 126.595 110.576V6.73535C126.595 4.35059 124.661 2.41699 122.276 2.41699H130.046C132.431 2.41699 134.365 4.35059 134.365 6.73535Z" fill="#E0ABFF"></path>
                <path d="M105.94 128.969H24.7931C22.4087 128.969 20.4761 127.036 20.4761 124.652V20.8097C20.4761 18.4253 22.409 16.4927 24.7931 16.4927H105.94C108.324 16.4927 110.257 18.4256 110.257 20.8097V124.651C110.257 127.036 108.324 128.969 105.94 128.969Z" fill="white"></path>
                <path d="M110.257 20.8098V124.653C110.257 127.038 108.323 128.972 105.939 128.972H98.3267C100.711 128.972 102.645 127.038 102.645 124.653V20.8098C102.645 18.4282 100.711 16.4946 98.3267 16.4946H105.939C108.323 16.4946 110.257 18.4282 110.257 20.8098Z" fill="#F8EBFF"></path>
                <path d="M144.856 61.3402V143.924C144.856 150.002 139.928 154.929 133.85 154.929H20.9896C14.9084 154.929 9.98096 150.002 9.98096 143.924V80.6021C9.98096 74.5241 14.9084 69.5967 20.9896 69.5967H71.5659C75.6877 69.5967 79.4356 67.2022 81.1694 63.4607L83.1965 59.0876C84.0453 57.2554 85.4005 55.7042 87.1021 54.617C88.8037 53.5298 90.7807 52.952 92.8 52.9517H136.467C141.101 52.9517 144.856 56.7061 144.856 61.3402Z" fill="#FAFF00"></path>
                <path d="M144.857 61.3402V143.924C144.857 150.002 139.93 154.929 133.852 154.929H125.866C131.944 154.929 136.872 150.002 136.872 143.924V61.3402C136.872 56.7061 133.117 52.9517 128.486 52.9517H136.469C141.103 52.9517 144.857 56.7061 144.857 61.3402Z" fill="#FAFF00"></path>
                <path d="M144.856 98.9302V143.925C144.856 150.003 139.928 154.93 133.85 154.93H78.5849C77.6113 152.996 77.1057 150.86 77.1089 148.694V106.487C77.1089 98.8174 83.3286 92.5977 90.9985 92.5977H133.202C138.088 92.5977 142.381 95.1178 144.856 98.9302Z" fill="#FAFF00"></path>
                <path d="M141.131 162.583H98.9255C91.2542 162.583 85.0352 156.364 85.0352 148.693V106.488C85.0352 98.8167 91.2539 92.5977 98.9255 92.5977H141.13C148.802 92.5977 155.021 98.8164 155.021 106.488V148.693C155.021 156.364 148.802 162.583 141.131 162.583Z" fill="#7029CF"></path>
                <path d="M141.13 92.5977H133.205C140.876 92.5977 147.095 98.8164 147.095 106.488V148.693C147.095 156.364 140.876 162.583 133.205 162.583H141.13C148.801 162.583 155.02 156.364 155.02 148.693V106.488C155.02 98.8167 148.801 92.5977 141.13 92.5977Z" fill="#7029CF"></path>
                <path d="M137.519 132.734L124.985 148.353C122.44 151.523 117.614 151.523 115.07 148.353L102.536 132.734C99.4264 129.063 102.305 123.001 107.138 123.141H111.999V107.624C111.999 105.872 113.419 104.452 115.171 104.452H124.883C126.635 104.452 128.056 105.872 128.056 107.624V123.141H132.916C137.749 123.001 140.629 129.063 137.519 132.734Z" fill="#F8EBFF"></path>
                <path d="M137.519 132.734L124.985 148.353C122.441 151.523 117.615 151.523 115.071 148.353L114.375 147.487C116.266 147.53 118.172 146.744 119.478 145.116L129.593 132.734C132.704 129.063 129.823 123 124.992 123.141H122.869C122.143 123.141 121.446 122.852 120.933 122.339C120.419 121.825 120.131 121.129 120.131 120.403V107.624C120.131 105.872 118.711 104.452 116.959 104.452H124.884C126.636 104.452 128.056 105.872 128.056 107.624V123.141H132.917C137.749 123.001 140.63 129.063 137.519 132.734Z" fill="#E0ABFF"></path>
                <path d="M63.143 105.777H28.1759C25.9742 105.777 24.1895 103.993 24.1895 101.791V96.5841C24.1895 94.3824 25.9742 92.5977 28.1759 92.5977H63.143C65.3447 92.5977 67.1294 94.3824 67.1294 96.5841V101.791C67.1294 103.993 65.3447 105.777 63.143 105.777Z" fill="white"></path>
                <path d="M67.129 96.5841V101.792C67.129 103.993 65.3436 105.778 63.1426 105.778H56.7295C58.9338 105.778 60.7159 103.993 60.7159 101.792V96.5841C60.7159 94.383 58.9338 92.5977 56.7295 92.5977H63.1426C65.3436 92.5977 67.129 94.383 67.129 96.5841Z" fill="#F8EBFF"></path>
                <path d="M53.3601 38.5621H37.9571C35.5298 38.5621 33.562 36.5943 33.562 34.167C33.562 31.7397 35.5298 29.772 37.9571 29.772H53.3601C55.7874 29.772 57.7551 31.7397 57.7551 34.167C57.7551 36.5943 55.7874 38.5621 53.3601 38.5621Z" fill="#7029CF"></path>
                <path d="M57.7547 34.1677C57.7547 35.3794 57.2616 36.4815 56.4688 37.2743C55.6729 38.0703 54.5739 38.5634 53.3622 38.5634H46.8267C48.0416 38.5634 49.1405 38.0703 49.9365 37.2743C50.7325 36.4815 51.2224 35.3794 51.2224 34.1677C51.2224 31.741 49.2565 29.772 46.8267 29.772H53.3622C55.7889 29.772 57.7547 31.741 57.7547 34.1677Z" fill="#7029CF"></path>
                <path d="M147.274 91.3861V61.3391C147.274 55.3817 142.427 50.5348 136.469 50.5348H112.674V20.8103C112.674 17.0972 109.653 14.0762 105.94 14.0762H46.9996V6.73406C47.0002 6.23031 47.2006 5.74737 47.5568 5.39116C47.913 5.03496 48.396 4.83458 48.8997 4.83398H130.047C130.55 4.83458 131.033 5.03496 131.389 5.39116C131.746 5.74737 131.946 6.23031 131.947 6.73406V41.5584C131.947 42.8936 133.028 43.9754 134.364 43.9754C135.699 43.9754 136.781 42.8936 136.781 41.5584V6.73406C136.781 3.02092 133.76 0 130.047 0H48.8997C45.1866 0 42.1656 3.02092 42.1656 6.73406V14.0759H24.793C21.0798 14.0759 18.0589 17.0968 18.0589 20.81V67.5037C12.0625 68.8446 7.56592 74.2058 7.56592 80.6009V143.923C7.56592 151.325 13.5878 157.347 20.9892 157.347H74.3258C75.661 157.347 76.7428 156.265 76.7428 154.93C76.7428 153.595 75.661 152.513 74.3258 152.513H20.9892C16.2532 152.513 12.3999 148.66 12.3999 143.923V80.6012C12.3999 75.8652 16.2529 72.0119 20.9889 72.0119H71.5663C76.6113 72.0119 81.242 69.0541 83.3631 64.4766L85.3902 60.1022C86.7227 57.2266 89.6318 55.3688 92.8013 55.3688H136.469C139.761 55.3688 142.439 58.0471 142.439 61.3391V90.2379C142.004 90.2014 141.567 90.1823 141.13 90.1805H98.9247C89.9332 90.1805 82.6174 97.496 82.6174 106.488V148.693C82.6174 157.685 89.9328 165 98.9247 165H141.13C150.121 165 157.437 157.685 157.437 148.693V106.488C157.437 99.669 153.228 93.8176 147.274 91.3861ZM81.0045 58.0697L78.9774 62.4441C77.6448 65.3197 74.7357 67.1776 71.5663 67.1776H22.8925V20.8103C22.8931 20.3066 23.0935 19.8236 23.4497 19.4674C23.8059 19.1112 24.2889 18.9108 24.7926 18.9102H105.939C106.443 18.9108 106.926 19.1112 107.282 19.4674C107.639 19.8236 107.839 20.3066 107.84 20.8103V50.5345H92.8013C87.7566 50.5348 83.1259 53.4922 81.0045 58.0697ZM152.603 148.693C152.603 155.019 147.456 160.166 141.13 160.166H98.9247C92.5983 160.166 87.4514 155.019 87.4514 148.693V106.488C87.4514 100.161 92.5983 95.0145 98.9247 95.0145H141.13C146.911 94.8557 152.751 100.171 152.603 106.488V148.693H152.603Z" fill="#2C2C2C"></path>
                <path d="M132.884 120.723H130.473V107.623C130.473 104.541 127.965 102.034 124.884 102.034H115.171C112.089 102.034 109.581 104.541 109.581 107.623V120.723H107.17C103.99 120.644 101.127 122.452 99.6879 125.444C98.2422 128.449 98.619 131.827 100.669 134.268L113.185 149.865C114.858 151.95 117.352 153.147 120.026 153.147H120.027C121.341 153.15 122.638 152.856 123.823 152.288C125.008 151.72 126.049 150.891 126.869 149.865L139.384 134.268C141.435 131.827 141.812 128.449 140.366 125.444C138.927 122.452 136.067 120.639 132.884 120.723ZM135.674 131.17L135.633 131.22L123.099 146.839C122.731 147.3 122.263 147.672 121.731 147.927C121.199 148.182 120.617 148.314 120.027 148.313C118.826 148.313 117.706 147.776 116.955 146.839L104.421 131.22C104.408 131.203 104.394 131.187 104.38 131.171C103.4 130.014 103.564 128.537 104.044 127.54C104.271 127.069 105.143 125.554 106.97 125.554C107.003 125.554 107.035 125.555 107.068 125.556C107.091 125.557 107.115 125.557 107.138 125.557H111.998C113.334 125.557 114.415 124.475 114.415 123.14V107.623C114.416 107.423 114.495 107.231 114.637 107.089C114.779 106.948 114.971 106.868 115.171 106.868H124.884C125.084 106.868 125.276 106.948 125.417 107.089C125.559 107.231 125.638 107.423 125.639 107.623V123.14C125.639 124.475 126.721 125.557 128.056 125.557H132.916C132.94 125.557 132.963 125.557 132.987 125.556C134.885 125.492 135.78 127.061 136.01 127.54C136.49 128.537 136.653 130.014 135.674 131.17ZM28.1756 90.1807C24.6448 90.1807 21.7725 93.0534 21.7725 96.5841V101.791C21.7725 105.322 24.6448 108.194 28.1756 108.194H63.143C66.6737 108.194 69.5461 105.322 69.5461 101.791V96.5841C69.5461 93.0534 66.6737 90.1807 63.143 90.1807H28.1756ZM64.7121 96.5841V101.791C64.7116 102.207 64.5461 102.606 64.252 102.9C63.9578 103.194 63.559 103.36 63.143 103.36H28.1756C27.7596 103.36 27.3607 103.194 27.0666 102.9C26.7724 102.606 26.607 102.207 26.6064 101.791V96.5841C26.6069 96.168 26.7723 95.7691 27.0665 95.4749C27.3606 95.1807 27.7595 95.0152 28.1756 95.0147H63.143C63.559 95.0153 63.9578 95.1808 64.252 95.475C64.5461 95.7692 64.7116 96.1681 64.7121 96.5841ZM37.9576 40.9791H53.3606C57.1166 40.9791 60.1727 37.9234 60.1727 34.167C60.1727 30.4107 57.1169 27.355 53.3606 27.355H37.9576C34.2016 27.355 31.1456 30.4107 31.1456 34.167C31.1456 37.9234 34.2016 40.9791 37.9576 40.9791ZM37.9576 32.1893H53.3606C54.4515 32.1893 55.3387 33.0765 55.3387 34.1674C55.3387 35.2582 54.4515 36.1454 53.3606 36.1454H37.9576C36.8667 36.1454 35.9795 35.2582 35.9795 34.1674C35.9795 33.0765 36.8671 32.1893 37.9576 32.1893ZM97.7753 31.75H67.1668C65.8317 31.75 64.7498 32.8319 64.7498 34.167C64.7498 35.5022 65.8317 36.584 67.1668 36.584H97.7753C99.1104 36.584 100.192 35.5022 100.192 34.167C100.192 32.8319 99.1104 31.75 97.7753 31.75ZM71.8851 45.4724H51.8321C50.497 45.4724 49.4151 46.5543 49.4151 47.8894C49.4151 49.2246 50.497 50.3064 51.8321 50.3064H71.8851C73.2202 50.3064 74.3021 49.2246 74.3021 47.8894C74.3021 46.5543 73.2199 45.4724 71.8851 45.4724ZM33.5629 50.3064H40.3949C41.73 50.3064 42.8119 49.2246 42.8119 47.8894C42.8119 46.5543 41.73 45.4724 40.3949 45.4724H33.5629C32.2277 45.4724 31.1459 46.5543 31.1459 47.8894C31.1459 49.2246 32.2277 50.3064 33.5629 50.3064ZM71.8851 55.3273H33.5629C32.2277 55.3273 31.1459 56.4092 31.1459 57.7443C31.1459 59.0795 32.2277 60.1613 33.5629 60.1613H71.8851C73.2202 60.1613 74.3021 59.0795 74.3021 57.7443C74.3021 56.4092 73.2199 55.3273 71.8851 55.3273Z" fill="#2C2C2C"></path>
                </g>
                <defs>
                <clipPath id="clip0_1088_12745">
                <rect width="165" height="165" fill="white"></rect>
                </clipPath>
                </defs>
                </svg>
            </div>
            <h2 className="text-[#242424] mb-2 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Export Report!</h2>
            <p className="text-[#2C2C2C] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              Are you sure you want to<br />extract this report?
            </p>
            <div className="flex gap-4 w-full">
              <button onClick={handleExport} className="flex-1 bg-[#7029CF] text-white py-3 rounded-[1536px] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
              <button onClick={() => setShowExportModal(false)} className="flex-1 bg-white text-[#7029CF] py-3 rounded-[1536px] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PropertyManagement;
