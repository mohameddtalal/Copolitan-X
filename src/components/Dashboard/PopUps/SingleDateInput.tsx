"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface SingleDateInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  pillWidth?: number | string;
  pillHeight?: number;
  pillBorderRadius?: number;
}

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

const SingleDateInput: React.FC<SingleDateInputProps> = ({
  value,
  onChange,
  placeholder = "Select",
  pillWidth = 100,
  pillHeight = 32,
  pillBorderRadius = 999,
}) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseDate(value);

  useEffect(() => {
    if (open && selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [open, selectedDate]);

  const computePosition = (triggerEl: HTMLDivElement | null) => {
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const popW = 220;
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

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const clickedWrap = wrapRef.current?.contains(e.target as Node);
      const clickedPopover = popoverRef.current?.contains(e.target as Node);
      if (!clickedWrap && !clickedPopover) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openCalendar = () => {
    computePosition(triggerRef.current);
    setOpen(true);
  };

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  };

  const handleDayClick = (y: number, mo: number, d: number) => {
    const clicked = new Date(y, mo, d);
    onChange(fmt(clicked));
    setOpen(false);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDow = new Date(viewYear, viewMonth, 1).getDay();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const getDayStyle = (date: Date): React.CSSProperties => {
    const isSelected = selectedDate && sameDay(date, selectedDate);
    if (isSelected) return { background: "#7029CF", color: "#fff", borderRadius: "50%", fontWeight: 600 };
    return { background: "transparent", color: "#333", borderRadius: "50%" };
  };

  const pillStyle: React.CSSProperties = {
    width: pillWidth,
    height: pillHeight,
    borderRadius: pillBorderRadius,
    border: "1.5px solid #B1B1B1",
    padding: "0 12px",
    fontSize: 12,
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: value ? "#333" : "#aaa",
    fontFamily: "GT Walsheim",
    boxSizing: "border-box",
    userSelect: "none",
    transition: "border-color 0.2s",
  };

  const calIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.66659V3.33325M12 4.66659V5.99992M12 4.66659H9M4 8.66659V14.6666C4 15.403 4.59695 15.9999 5.33333 15.9999H14.6667C15.4031 15.9999 16 15.403 16 14.6666V8.66659H4Z" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 8.66675V6.00008C4 5.2637 4.59695 4.66675 5.33333 4.66675H6.66667" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66675 3.33325V5.99992" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9999 8.66675V6.00008C15.9999 5.2637 15.403 4.66675 14.6666 4.66675H14.3333" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

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
        width: 220,
        border: "1.5px solid #B1B1B1",
      }}
    >
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, background: "#E4E4E4", borderRadius: "24px", padding: "4px 8px" }}>
        <button
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); changeMonth(-1); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", boxShadow: "0 2px 6px rgba(112,41,207,0.18)" }}
        >‹</button>
        <div style={{ borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "#242424", letterSpacing: 0.1, userSelect: "none" }}>
          {MONTHS[viewMonth]} {viewYear}
        </div>
        <button
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); changeMonth(1); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", boxShadow: "0 2px 6px rgba(112,41,207,0.18)" }}
        >›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0, marginBottom: 2 }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, color: "#aaa", fontWeight: 600, padding: "2px 0" }}>{d}</div>
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
          const d = i + 1;
          const date = new Date(viewYear, viewMonth, d);
          const ds = getDayStyle(date);
          return (
            <div
              key={d}
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleDayClick(viewYear, viewMonth, d); }}
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
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onChange(""); }}
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

  return (
    <>
      <div ref={wrapRef}>
        <div
          ref={triggerRef}
          onClick={openCalendar}
          style={pillStyle}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7029CF")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E0D4F5")}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {value || placeholder}
          </span>
          {calIcon}
        </div>
      </div>
      {popover}
    </>
  );
};

export default SingleDateInput;
