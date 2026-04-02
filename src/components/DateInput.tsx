"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── Props ────────────────────────────────────────────────────────────────────
interface DateRangeInputProps {
  fromValue: string;
  toValue: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  placeholderFrom?: string;
  placeholderTo?: string;
  layout?: "row" | "column";
  pillWidth?: number | string;
  pillHeight?: number;
  pillBorderRadius?: number;
  showLabels?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const pad2 = (n: number) => String(n).padStart(2, "0");
const fmt  = (d: Date)   => `${pad2(d.getDate())}/${pad2(d.getMonth()+1)}/${d.getFullYear()}`;

const parseDate = (str: string): Date | null => {
  if (!str) return null;
  const m = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(+m[3], +m[2]-1, +m[1]);
  return isNaN(d.getTime()) ? null : d;
};

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth()    === b.getMonth()    &&
  a.getDate()     === b.getDate();

const isBetween = (d: Date, a: Date, b: Date) => d > a && d < b;

const autoSlash = (val: string, prev: string): string => {
  let v = val.replace(/[^\d/]/g, "");
  if (v.length === 2 && prev.length === 1 && !v.includes("/")) v += "/";
  if (v.length === 5 && prev.length === 4 && v.split("/").length === 2) v += "/";
  return v;
};

// ─── Component ────────────────────────────────────────────────────────────────
const DateRangeInput: React.FC<DateRangeInputProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  placeholderFrom = "From Date",
  placeholderTo   = "To Date",
  layout = "column",
  pillWidth = 100,
  pillHeight = 32,
  pillBorderRadius = 999,
  showLabels = false,
}) => {
  const [open, setOpen]           = useState(false);
  const [viewYear, setViewYear]   = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [fromManual, setFromManual] = useState(fromValue || "");
  const [toManual,   setToManual]   = useState(toValue   || "");
  const [selecting, setSelecting] = useState<"from"|"to">("from");

  // For portal positioning
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const wrapRef    = useRef<HTMLDivElement>(null);
  const fromRef    = useRef<HTMLDivElement>(null);
  const toRef      = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const fromDate = parseDate(fromValue);
  const toDate   = parseDate(toValue);

  useEffect(() => { setFromManual(fromValue || ""); }, [fromValue]);
  useEffect(() => { setToManual(toValue || "");     }, [toValue]);

  useEffect(() => {
    if (open) {
      const ref = fromDate ?? toDate ?? new Date();
      setViewYear(ref.getFullYear());
      setViewMonth(ref.getMonth());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Compute popover position so it never gets cropped
  const computePosition = (triggerEl: HTMLDivElement | null) => {
  if (!triggerEl) return;

  const rect = triggerEl.getBoundingClientRect();
  const popW = 220; // نفس width البوبوفر
  const gap = 6;

 
  let top = rect.bottom + gap;

  
let left = rect.left + rect.width / 2 - popW / 2;


  const vw = window.innerWidth;
  if (left + popW > vw - 8) {
    left = vw - popW - 8;
  }

  setPopoverPos({
    top: top + window.scrollY,
    left: left + window.scrollX,
  });
};
  // Recompute on scroll/resize while open
  // Close calendar on scroll
useEffect(() => {
  if (!open) return;

  const handleScroll = () => {
    setOpen(false);
  };

  window.addEventListener("scroll", handleScroll, true);

  return () => {
    window.removeEventListener("scroll", handleScroll, true);
  };
}, [open]);

  // Outside click closes
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const clickedWrap    = wrapRef.current?.contains(e.target as Node);
      const clickedPopover = popoverRef.current?.contains(e.target as Node);
      if (!clickedWrap && !clickedPopover) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openCalendar = (which: "from" | "to") => {
    setSelecting(which);
    const trigger = which === "from" ? fromRef.current : toRef.current;
    computePosition(trigger);
    setOpen(true);
  };

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setViewMonth(m); setViewYear(y);
  };

  const handleDayClick = (y: number, mo: number, d: number) => {
    const clicked   = new Date(y, mo, d);
    const formatted = fmt(clicked);

    if (!fromDate || (fromDate && toDate)) {
      onFromChange(formatted);
      onToChange("");
      setFromManual(formatted);
      setToManual("");
      setSelecting("to");
      return;
    }

    if (clicked < fromDate) {
      onToChange(fromValue);
      onFromChange(formatted);
      setToManual(fromValue);
      setFromManual(formatted);
    } else {
      onToChange(formatted);
      setToManual(formatted);
    }
    setSelecting("from");
    setOpen(false);
    setHoverDate(null);
  };

  // ── calendar grid ──────────────────────────────────────────────────────────
  const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDow      = new Date(viewYear, viewMonth, 1).getDay();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  const effectiveTo   = toDate ?? (fromDate && hoverDate && hoverDate >= fromDate ? hoverDate : null);

  const getDayStyle = (date: Date): React.CSSProperties => {
    const isFrom    = fromDate && sameDay(date, fromDate);
    const isTo      = toDate   && sameDay(date, toDate);
    const isHovered = !toDate && hoverDate && fromDate && sameDay(date, hoverDate) && hoverDate >= fromDate;
    const inRange   = fromDate && effectiveTo && isBetween(date, fromDate, effectiveTo);

    if (isFrom && isTo)  return { background: "#7029CF", color: "#fff", borderRadius: "50%", fontWeight: 600 };
    if (isFrom)          return { background: "#7029CF", color: "#fff", fontWeight: 600, borderRadius: effectiveTo ? "50% 50%" : "50%" };
    if (isTo || isHovered) return { background: "#7029CF", color: "#fff", fontWeight: 600, borderRadius: "50% 50%" };
    if (inRange)         return { background: "#e8dff7", color: "#7029CF", borderRadius: "50%" };
    return { background: "transparent", color: "#333", borderRadius: "50%" };
  };

  const pillStyle = (hasVal: boolean): React.CSSProperties => ({
    width: pillWidth,
    height: pillHeight,
    borderRadius: pillBorderRadius,
    border: "1.5px solid #E0D4F5",
    padding: "0 12px",
    fontSize: 12,
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: hasVal ? "#333" : "#aaa",
    fontFamily: "GT Walsheim",
    boxSizing: "border-box",
    userSelect: "none",
    transition: "border-color 0.2s",
  });

  const calIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.66659V3.33325M12 4.66659V5.99992M12 4.66659H9M4 8.66659V14.6666C4 15.403 4.59695 15.9999 5.33333 15.9999H14.6667C15.4031 15.9999 16 15.403 16 14.6666V8.66659H4Z" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 8.66675V6.00008C4 5.2637 4.59695 4.66675 5.33333 4.66675H6.66667" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66675 3.33325V5.99992" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9999 8.66675V6.00008C15.9999 5.2637 15.403 4.66675 14.6666 4.66675H14.3333" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // ── Popover (rendered via portal so it's never clipped) ───────────────────
  const popover = open ? createPortal(
    <div
      ref={popoverRef}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: popoverPos.top,
        left: popoverPos.left,
        zIndex: 999999,
        background: "#fff",
        borderRadius: 18,
        padding: 8,
        width: 200,
        border: "1.5px solid #e8dff7",
      }}
    >
      {/* ── Month nav ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 ,background:"#E4E4E4",borderRadius:"24px",padding:"4px 8px"}}>
        <button
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); changeMonth(-1); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" ,boxShadow:"0 2px 6px rgba(112,41,207,0.18)"}}
        >‹</button>

        {/* ── Styled month/year pill ── */}
        <div style={{
          borderRadius: 999,
          padding: "4px 14px",
          fontSize: 12,
          fontWeight: 600,
          color: "#242424",
          letterSpacing: 0.1,
          userSelect: "none",
        }}>
          {MONTHS[viewMonth]} {viewYear}
        </div>

        <button
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); changeMonth(1); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20,  width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" ,boxShadow:"0 2px 6px rgba(112,41,207,0.18)"}}
        >›</button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0, marginBottom: 2 }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, color: "#aaa", fontWeight: 600, padding: "2px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0 }}>
        {Array.from({ length: startDow }, (_, i) => (
          <div key={`p${i}`} style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#ddd" }}>
            {prevMonthDays - startDow + i + 1}
          </div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const d    = i + 1;
          const date = new Date(viewYear, viewMonth, d);
          const ds   = getDayStyle(date);
          return (
            <div
              key={d}
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleDayClick(viewYear, viewMonth, d); }}
              onMouseEnter={() => { if (fromDate && !toDate) setHoverDate(date); }}
              onMouseLeave={() => setHoverDate(null)}
              style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, cursor: "pointer", transition: "background 0.1s", ...ds }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Clear */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          onMouseDown={(e) => {
            e.stopPropagation(); e.preventDefault();
            onFromChange(""); onToChange("");
            setFromManual(""); setToManual("");
            setSelecting("from");
          }}
          style={{ fontSize: 10, color: "#aaa", cursor: "pointer", userSelect: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7029CF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
        >
          Clear
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: "#555",
    fontFamily: "GT Walsheim",
    marginBottom: 6,
    display: "block",
  };

  return (
    <>
      <div ref={wrapRef} style={{ display: "flex", flexDirection: layout, gap: layout === "row" ? 24 : 16, alignItems: "flex-start", position: "relative" }}>
        {/* From trigger */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {showLabels && <label style={labelStyle}>Start Date <span style={{ color: "#FA6E6E" }}>*</span></label>}
          <div ref={fromRef} onClick={() => openCalendar("from")} style={pillStyle(!!fromValue)} onMouseEnter={e => e.currentTarget.style.borderColor = "#7029CF"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E0D4F5"}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {fromValue || placeholderFrom}
            </span>
            {calIcon}
          </div>
        </div>

        {/* To trigger */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {showLabels && <label style={labelStyle}>End Date <span style={{ color: "#FA6E6E" }}>*</span></label>}
          <div ref={toRef} onClick={() => openCalendar("to")} style={pillStyle(!!toValue)} onMouseEnter={e => e.currentTarget.style.borderColor = "#7029CF"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E0D4F5"}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {toValue || placeholderTo}
            </span>
            {calIcon}
          </div>
        </div>
      </div>

      {/* Portal popover — rendered outside all parent stacking contexts */}
      {popover}
    </>
  );
};

export default DateRangeInput;