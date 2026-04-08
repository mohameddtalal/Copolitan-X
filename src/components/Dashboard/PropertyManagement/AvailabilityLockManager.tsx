"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNav } from "@/components/Dashboard/Context/Navcontext";
import DateInput from "@/components/DateInput";

const BASE_PROPERTIES = [
  { lob: "Copolitan X", location: "Swanlake", country: "Egypt" },
  { lob: "Copolitan X", location: "Palm Hills Club", country: "KSA" },
  { lob: "Copolitan X", location: "Mivida", country: "Egypt" },
  { lob: "Moca X Lounge", location: "Mivida", country: "Egypt" },
  { lob: "Copolitan X", location: "Swanlake", country: "Egypt" },
  { lob: "Copolitan X", location: "Hassan Allam", country: "Egypt" },
  { lob: "Copolitan X", location: "Seven Fortunes", country: "Oman" },
  { lob: "Copolitan X", location: "Seven Fortunes", country: "KSA" },
  { lob: "Copolitan X", location: "BeFit Marassi", country: "Egypt" },
  { lob: "Copolitan X", location: "Copolitan X", country: "Egypt" },
];
const UNIQUE_COUNTRIES = [...new Set(BASE_PROPERTIES.map(p => p.country))];
const UNIQUE_LOBS      = [...new Set(BASE_PROPERTIES.map(p => p.lob))];
const ALL_LOCATIONS    = [...new Set(BASE_PROPERTIES.map(p => p.location.trim()))];
const MONTH_SHORT = ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."];
const MONTH_FULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS  = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ── Types ─────────────────────────────────────────────────────────────────────
type LockRow  = { id: string; startDate: string; endDate: string; lockName: string };
type LOBEntry = { id: string; lob: string; excludedLocations: string[]; closureStart: string; closureEnd: string; propertyLabel: string; appMessage: string; active: boolean };
type LockCard = { id: string; lockName: string; startDate: string; endDate: string; lobEntries: LOBEntry[] };



// ── Modal ─────────────────────────────────────────────────────────────────────
const AddNewLockModal = ({ onSave, onClose }: { onSave: (rows: LockRow[]) => void; onClose: () => void }) => {
  const [rows, setRows] = useState<LockRow[]>([]);
  const [activeRow, setActiveRow] = useState<LockRow>({ id: uid(), startDate: "", endDate: "", lockName: "" });
  const [yr, setYr] = useState(new Date().getFullYear());
  const [mo, setMo] = useState(new Date().getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const updateActive = (field: keyof LockRow, val: string) =>
    setActiveRow(prev => ({ ...prev, [field]: val }));

  const addRow = () => {
    if (activeRow.lockName.trim() || activeRow.startDate || activeRow.endDate) {
      setRows(prev => [activeRow, ...prev]);
    }
    setActiveRow({ id: uid(), startDate: "", endDate: "", lockName: "" });
  };

  const remRow = (id: string) => setRows(prev => prev.filter(r => r.id !== id));

  const activeComplete = !!(activeRow.lockName.trim() && activeRow.startDate && activeRow.endDate);
  const allValid = activeComplete
    ? [activeRow, ...rows.filter(r => r.lockName.trim() && r.startDate && r.endDate)]
    : rows.filter(r => r.lockName.trim() && r.startDate && r.endDate);

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

  const fromDate = parseDate(activeRow.startDate);
  const toDate   = parseDate(activeRow.endDate);
  const effectiveTo = toDate ?? (fromDate && hoverDate && hoverDate >= fromDate ? hoverDate : null);

  const daysInMonth   = new Date(yr, mo + 1, 0).getDate();
  const startDow      = new Date(yr, mo, 1).getDay();
  const prevMonthDays = new Date(yr, mo, 0).getDate();

  const getDayStyle = (date: Date): React.CSSProperties => {
    const isFrom    = fromDate && sameDay(date, fromDate);
    const isTo      = toDate   && sameDay(date, toDate);
    const inRange   = fromDate && effectiveTo && isBetween(date, fromDate, effectiveTo);
    const isHovered = !toDate && hoverDate && fromDate && sameDay(date, hoverDate) && hoverDate >= fromDate;

    if (isFrom && isTo)    return { background: "#7029CF", color: "#fff", borderRadius: "50%", fontWeight: 600 };
    if (isFrom)            return { background: "#7029CF", color: "#fff", fontWeight: 600, borderRadius: "50%" };
    if (isTo || isHovered) return { background: "#7029CF", color: "#fff", fontWeight: 600, borderRadius: "50%" };
    if (inRange)           return { background: "#e8dff7", color: "#7029CF", borderRadius: "50%" };
    return { background: "transparent", color: "#333", borderRadius: "50%" };
  };

  const TrashIcon = () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" fill="#E46464"/>
      <path d="M14 4H10.25M2 4H5.75M5.75 4V2.665C5.75 1.93 6.347 1.333 7.083 1.333H8.917C9.653 1.333 10.25 1.93 10.25 2.665V4M5.75 4H10.25" stroke="#E46464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 22, padding: "28px 32px", width: "min(860px, 94vw)", maxHeight: "90vh", overflowY: "auto"}} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#7029CF", marginLeft: 10 }}>Lock Calendar</h3>
         <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0, padding: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15.8571L14.3571 12.2143C14.2388 12.0959 14.2388 11.9041 14.3571 11.7857L18 8.14286C18.5917 7.55116 18.5917 6.59169 18 6C17.4083 5.40831 16.4488 5.40831 15.8571 6L12.2143 9.64286C12.0959 9.7612 11.9041 9.7612 11.7857 9.64286L8.14286 6C7.55116 5.40831 6.59169 5.40831 6 6C5.40831 6.59169 5.40831 7.55116 6 8.14286L9.64286 11.7857C9.7612 11.9041 9.7612 12.0959 9.64286 12.2143L6 15.8571C5.40831 16.4488 5.40831 17.4083 6 18C6.59169 18.5917 7.55116 18.5917 8.14286 18L11.7857 14.3571C11.9041 14.2388 12.0959 14.2388 12.2143 14.3571L15.8571 18C16.4488 18.5917 17.4083 18.5917 18 18C18.5917 17.4083 18.5917 16.4488 18 15.8571Z" fill="#565656"></path>
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          {/* Left: Calendar */}
          <div style={{ width: 260, minWidth: 260, maxWidth: 260, height: 310, flexShrink: 0, boxSizing: "border-box", boxShadow: "0px 0px 8px 0px #00000040", borderRadius: "24px", padding: "12px" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F5F5F5", borderRadius: 24, padding: "6px 10px", marginBottom: 12 }}>
              <button onClick={() => { let m = mo-1, y = yr; if (m<0){m=11;y--;} setMo(m); setYr(y); }} style={{ background: "#fff", border: "none", cursor: "pointer", fontSize: 18, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>&#8249;</button>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#333", fontFamily: "GT Walsheim" }}>{MONTH_FULL[mo]} {yr}</div>
              <button onClick={() => { let m = mo+1, y = yr; if (m>11){m=0;y++;} setMo(m); setYr(y); }} style={{ background: "#fff", border: "none", cursor: "pointer", fontSize: 18, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>&#8250;</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0, marginBottom: 4 }}>
              {DAY_LABELS.map((d: string) => (
                <div key={d} style={{ textAlign: "center", fontSize: 10, color: "#aaa", fontWeight: 600, padding: "4px 0" }}>{d}</div>
              ))}
            </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0, alignContent: "start", overflow: "hidden"}}>              {Array.from({ length: startDow }, (_, i) => (
                <div key={`p${i}`} style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#ddd" }}>{prevMonthDays - startDow + i + 1}</div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d    = i + 1;
                const date = new Date(yr, mo, d);
                const ds   = getDayStyle(date);
                return (
                  <div
                    key={d}
                    onMouseEnter={() => { if (fromDate && !toDate) setHoverDate(date); }}
                    onMouseLeave={() => setHoverDate(null)}
                    onClick={() => {
                      const formatted = `${String(d).padStart(2, "0")}/${String(mo + 1).padStart(2, "0")}/${yr}`;
                      if (!fromDate || (fromDate && toDate)) {
                        updateActive("startDate", formatted);
                        updateActive("endDate", "");
                      } else if (date < fromDate) {
                        updateActive("endDate", activeRow.startDate);
                        updateActive("startDate", formatted);
                      } else {
                        updateActive("endDate", formatted);
                      }
                      setHoverDate(null);
                    }}
                    style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", transition: "background 0.1s", ...ds }}
                  >
                    {d}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={() => {
                  updateActive("startDate", "");
                  updateActive("endDate", "");
                }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 11, fontFamily: "GT Walsheim" }}
                onMouseEnter={e => e.currentTarget.style.color = "#7029CF"}
                onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
              >Clear</button>
            </div>
          </div>

          {/* Right: Input Rows */}
          <div style={{ flex: 1 }}>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr 28px", gap: "12px", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#242424", fontFamily: "GT Walsheim" }}>
              Select <span style={{ color: "#FA6E6E" }}>*</span>
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#242424", fontFamily: "GT Walsheim" }}>
                Select <span style={{ color: "#FA6E6E" }}>*</span>
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#242424", fontFamily: "GT Walsheim" }}>Lock Name</span>
              <span />
            </div>

            {/* Active (editable) row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr 28px", gap: "12px", marginBottom: 12, alignItems: "center" }}>
              <input readOnly value={activeRow.startDate} placeholder="From"
                style={{ width: "100%", height: 38, borderRadius: 12, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#fff", boxSizing: "border-box" }} />
              <input readOnly value={activeRow.endDate} placeholder="To"
                style={{ width: "100%", height: 38, borderRadius: 12, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#fff", boxSizing: "border-box" }} />
              <div style={{ position: "relative" }}>
                <input
                  value={activeRow.lockName}
                  onChange={e => updateActive("lockName", e.target.value)}
                  placeholder="Labor Day"
                  style={{ height: 38, borderRadius: 12, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", width: "100%", boxSizing: "border-box", background: "#fff" }}
                  onFocus={e => e.currentTarget.style.borderColor = "#B1B1B1"}
                  onBlur={e => e.currentTarget.style.borderColor = "#B1B1B1"}
                />
                <button
                  onClick={addRow}
                  style={{ position: "absolute", top: "calc(100% + 16px)", right: 0, background: "none", border: "1.5px solid #7029CF", borderRadius: 999, cursor: "pointer", color: "#7029CF", fontSize: 11, fontWeight: 400, fontFamily: "GT Walsheim", padding: "5px 8px", whiteSpace: "nowrap", zIndex: 10 }}
                >
                  + Add New
                </button>
              </div>
              <span />
            </div>

            {/* Saved rows */}
            {rows.length > 0 && (
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
                {rows.map(row => (
                  <div key={row.id}
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr 28px", gap: "12px", alignItems: "center" ,marginTop: 16}}>
                    <input readOnly value={row.startDate}
                      style={{ width: "100%", height: 38, borderRadius: 16, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#E4E4E4", boxSizing: "border-box" }} />
                    <input readOnly value={row.endDate}
                      style={{ width: "100%", height: 38, borderRadius: 16, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#E4E4E4", boxSizing: "border-box" }} />
                    <input readOnly value={row.lockName}
                      style={{ height: 38, borderRadius: 16, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", width: "100%", boxSizing: "border-box", background: "#E4E4E4" }} />
                    <button
                      onClick={() => remRow(row.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end",marginTop:"10px" }}>
          <button onClick={() => allValid.length > 0 && onSave(allValid)}
            style={{ padding: "10px 48px", borderRadius: 999, border: "none", background: allValid.length > 0 ? "#7029CF" : "#7029CF8F", color: "#fff", fontSize: 14, fontWeight: 600, cursor: allValid.length > 0 ? "pointer" : "not-allowed", fontFamily: "GT Walsheim", transition: "all 0.2s", boxShadow: allValid.length > 0 ? "0 4px 12px rgba(112,41,207,0.2)" : "none" }}>Save</button>
          <button onClick={onClose} style={{ padding: "10px 42px", borderRadius: 999, border: "2px solid #7029CF", background: "#fff", color: "#7029CF", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ── Searchable dropdown ─────────────────────────────────────────────────────
const SearchDropdown = ({
  selected,
  options,
  onChange,
  placeholder,
  multi = true,
}: {
  selected: string[];
  options: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  multi?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropPos, setDropPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (!open || !ref.current) return;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const filtered = options.filter(opt => opt.toLowerCase().includes(query.toLowerCase()));
  const displayValue = selected.length === 0 ? placeholder || "Select" : selected.join(", ");

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", fontFamily: "GT Walsheim" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", height: 50, borderRadius: 16, border: "1px solid #B1B1B1", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", fontSize: 12, color: selected.length ? "#333" : "#aaa", cursor: "pointer", boxSizing: "border-box" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "8px", textAlign: "left", flex: 1 }}>{displayValue}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>

      {open && dropPos && typeof document !== "undefined" && createPortal(
        <div ref={dropRef} style={{ position: "fixed", top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 9999, background: "#fff", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", overflow: "hidden" }}>
          <div style={{ padding: "8px 12px", borderBottom: "1px solid #F2F2F2" }}>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." style={{ width: "100%", height: 36, borderRadius: 12, border: "1px solid #B1B1B1", padding: "0 10px", fontSize: 12, fontFamily: "GT Walsheim", outline: "none" }} />
          </div>
          <div style={{ maxHeight: 180, overflowY: "auto" }}>
            {filtered.map((opt, idx) => {
              const isSelected = selected.includes(opt);
              return (
                <button key={opt} type="button" onClick={() => {
                  if (multi) {
                    onChange(isSelected ? selected.filter(s => s !== opt) : [...selected, opt]);
                  } else {
                    onChange([opt]);
                    setOpen(false);
                  }
                }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", borderBottom: idx < filtered.length - 1 ? "1px solid #F2F2F2" : "none", color: "#333", fontSize: 12 }}>
                  {multi && (
                    <span style={{ minWidth: 18, minHeight: 18, borderRadius: 4, border: isSelected ? "none" : "1.5px solid #B1B1B1", background: isSelected ? "#7029CF" : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {isSelected && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                  )}
                  <span>{opt}</span>
                </button>
              );
            })}
            {filtered.length === 0 && <div style={{ padding: "10px 12px", color: "#999", fontSize: 12 }}>No results</div>}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const YearDropdown = ({
  selectedYear,
  options,
  onChange,
}: {
  selectedYear: number;
  options: number[];
  onChange: (year: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(event.target as Node) &&
        dropRef.current && !dropRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDropPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    };

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", fontFamily: "GT Walsheim" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          borderRadius: 16,
          border: "1px solid #B1B1B1",
          background: "#7029CF",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 12px",
          minHeight: 34,
          minWidth:80,
          fontSize: 12,
          fontFamily: "GT Walsheim",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <span style={{marginRight:"8px"}}>{selectedYear}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>

      {open && dropPos && typeof document !== "undefined" && createPortal(
        <div
          ref={dropRef}
          style={{
            position: "fixed",
            top: dropPos.top,
            left: dropPos.left,
            width: dropPos.width,
            zIndex: 9999,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          {options.map(year => {
            const isSelected = year === selectedYear;
            return (
              <button
                key={year}
                type="button"
                onClick={() => {
                  onChange(year);
                  setOpen(false);
                }}
                style={{
                  
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  border: "none",
                  background: isSelected ? "#7029CF" : "#fff",
                  color: isSelected ? "#fff" : "#000",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "GT Walsheim",
                  
                }}
              >
                {year}
              </button>
            );
          })}
        </div>,
        document.body,
      )}
    </div>
  );
};

// ── LOB Form ─────────────────────────────────────────────────────────────────
const emptyLOB: Omit<LOBEntry, "id" | "active"> = { lob: "", excludedLocations: [], closureStart: "", closureEnd: "", propertyLabel: "", appMessage: "" };

const LOBForm = ({ onSave, onCancel, initial }: { onSave: (e: LOBEntry) => void; onCancel?: () => void; initial?: Partial<LOBEntry> }) => {
  const [form, setForm] = useState({ ...emptyLOB, ...initial });
  const valid = !!(form.lob && form.closureStart && form.closureEnd && form.propertyLabel && form.appMessage);
  const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#555", fontFamily: "GT Walsheim", marginBottom: 4, display: "block" };
  const req = <span style={{ color: "#FA6E6E" }}> *</span>;
  const inpStyle: React.CSSProperties = { width: "100%", height: 50, borderRadius: 16, border: "1px solid #B1B1B1", padding: "0 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#fff", boxSizing: "border-box" };

  return (
    <div style={{ padding: "14px 0" }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "31px" }}>
    
     
    {/* Row 1 */}
    <div>
      <label style={lbl}>LOB{req}</label>
      <SearchDropdown
        selected={form.lob ? [form.lob] : []}
        options={UNIQUE_LOBS}
        placeholder="Select"
        onChange={v => {
          const value = v.length ? v[v.length - 1] : "";
          setForm(f => ({ ...f, lob: value }));
        }}
      />
    </div>

    <div>
      <label style={lbl}>Excluded Locations{req}</label>
      <SearchDropdown
        selected={form.excludedLocations}
        options={ALL_LOCATIONS}
        placeholder="Select"
        onChange={v => setForm(f => ({ ...f, excludedLocations: v }))}
      />
    </div>

    <div>
      <label style={lbl}>Closure Start{req}</label>
      <DateInput
        fromValue={form.closureStart}
        toValue={form.closureEnd}
        onFromChange={v => setForm(f => ({ ...f, closureStart: v }))}
        onToChange={v => setForm(f => ({ ...f, closureEnd: v }))}
        placeholderFrom="Select"
        placeholderTo="Select"
        labelFrom="Closure Start"
        labelTo="Closure End"
        layout="single-from"
        showLabels={false}
        pillWidth="100%"
        pillHeight={50}
        pillBorderRadius={16}
      />
    </div>

    <div>
      <label style={lbl}>Closure End{req}</label>
      <DateInput
        fromValue={form.closureStart}
        toValue={form.closureEnd}
        onFromChange={v => setForm(f => ({ ...f, closureStart: v }))}
        onToChange={v => setForm(f => ({ ...f, closureEnd: v }))}
        placeholderFrom="Select"
        placeholderTo="Select"
        labelFrom="Closure Start"
        labelTo="Closure End"
        layout="single-to"
        showLabels={false}
        pillWidth="100%"
        pillHeight={50}
        pillBorderRadius={16}
      />
    </div>

    {/* Row 2 */}
    <div>
      <label style={lbl}>Property Label{req}</label>
      <input
        value={form.propertyLabel}
        onChange={e => setForm(f => ({ ...f, propertyLabel: e.target.value }))}
        placeholder="Select"
        style={inpStyle}
      />
    </div>

    <div style={{ gridColumn: "span 3" }}>
      <label style={lbl}>App. Message{req}</label>
      <textarea
        value={form.appMessage}
        onChange={e => setForm(f => ({ ...f, appMessage: e.target.value }))}
        placeholder="Insert"
        rows={1}
        style={{ width: "70%", borderRadius: 16, border: "1px solid #B1B1B1", padding: "9px 12px", fontSize: 12, color: "#333", outline: "none", fontFamily: "GT Walsheim", background: "#fff", resize: "vertical", boxSizing: "border-box", minHeight: 50, maxHeight: 160 }}
      />
    </div>

  </div>

  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
    {onCancel && (
      <button onClick={onCancel} style={{ padding: "7px 20px", borderRadius: 999, border: "1px solid #B1B1B1", background: "none", color: "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim" }}>
        Cancel
      </button>
    )}
    <button
      disabled={!valid}
      onClick={() => valid && onSave({ ...form, id: (form as any).id || uid(), active: (form as any).active ?? true })}
      style={{ padding: "12px 35px", borderRadius: 999, border: "none", background: valid ? "#7029CF" : "#7029CF8F", color: "#fff", fontSize: 12, fontWeight: 600, cursor: valid ? "pointer" : "not-allowed", fontFamily: "GT Walsheim", opacity: valid ? 1 : 0.65, transition: "all 0.2s" }}
    >
      Save
    </button>
  </div>
</div>
  );
};

// ── LOB Closures Section ──────────────────────────────────────────────────────
const LOBSection = ({ entries, onUpdate }: { entries: LOBEntry[]; onUpdate: (e: LOBEntry[]) => void }) => {
  const [editingEntry, setEditingEntry] = useState<LOBEntry | null>(null);
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverTarget, setPopoverTarget] = useState<{ id: string; top: number; left: number } | null>(null);
  const [popoverLocations, setPopoverLocations] = useState<string[]>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const affected = (lob: string) => [...new Set(BASE_PROPERTIES.filter(p => p.lob === lob).map(p => p.location))].length;

  const columnWidths = {
    lob: { maxWidth: 300, minWidth: 100, flex: "0 1 300px" },
    affected: { maxWidth: 200, minWidth: 80, flex: "0 1 150px" },
    excluded: { maxWidth: 300, minWidth: 130, flex: "0 1 300px" },
    closureStart: { maxWidth: 302, minWidth: 100, flex: "0 1 302px" },
    closureEnd: { maxWidth: 302, minWidth: 100, flex: "0 1 302px" },
    propertyLabel: { maxWidth: 300, minWidth: 100, flex: "0 1 300px" },
    appMessage: { maxWidth: 643, minWidth: 150, flex: "0 1 643px" },
    action: { maxWidth: 100, minWidth: 50, flex: "0 1 60px" }
  };

  const thS: React.CSSProperties = { padding: "10px 12px", fontSize: 16, fontWeight: 600, color: "#242424", fontFamily: "GT Walsheim", textAlign: "center" as const, borderBottom: "1.5px solid #EEE", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };  
  const tdS: React.CSSProperties = { padding: "10px 12px", fontSize: 14, color: "#242424", fontFamily: "GT Walsheim", textAlign: "center" as const, borderBottom: "1px dashed #F5F5F5", verticalAlign: "middle" as const, overflow: "hidden", textOverflow: "ellipsis" };

  const openNewForm = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
    setPopoverTarget(null);
    setPopoverAnchor(null);
  };

  const openEditForm = (entry: LOBEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
    setPopoverTarget(null);
    setPopoverAnchor(null);
  };

  const toggleExcludedPopover = (entry: LOBEntry, button: HTMLElement) => {
    if (popoverTarget?.id === entry.id) {
      setPopoverTarget(null);
      setPopoverAnchor(null);
      return;
    }
    const rect = button.getBoundingClientRect();
    setPopoverLocations(entry.excludedLocations);
    setPopoverAnchor(button);
    setPopoverTarget({ id: entry.id, top: rect.bottom + 8, left: rect.left });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && event.target instanceof Node && !popoverRef.current.contains(event.target)) {
        setPopoverTarget(null);
        setPopoverAnchor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!popoverAnchor || !popoverTarget) return;
    const update = () => {
      if (!popoverAnchor) return;
      const rect = popoverAnchor.getBoundingClientRect();
      setPopoverTarget(prev => prev ? { ...prev, top: rect.bottom + 8, left: rect.left } : null);
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [popoverAnchor, popoverTarget?.id]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    setPopoverTarget(null);
    setPopoverAnchor(null);
  };

  const handleSave = (entry: LOBEntry) => {
    if (editingEntry) {
      onUpdate(entries.map(x => x.id === editingEntry.id ? { ...entry, id: editingEntry.id } : x));
    } else {
      onUpdate([...entries, entry]);
    }
    closeModal();
  };

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h4 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#7029CF", margin: 0 }}>LOB Closures</h4>
        {entries.length > 0 && (
          <button onClick={openNewForm} style={{ padding: "5px 16px", borderRadius: 999, border: "1.5px solid #7029CF", background: "none", color: "#7029CF", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "GT Walsheim" }}>+ Add New</button>
        )}
      </div>
      {entries.length === 0 ? (
        <LOBForm initial={undefined} onSave={handleSave} />
      ) : (
        <div style={{ position: "relative" }}>
          <div className="hideScrollbar" style={{ overflowX: "auto", msOverflowStyle: "none", scrollbarWidth: "none", background: "#FFFFFF", borderRadius: 12, boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  {["LOB", "Affected Locations", "Locations Excluded", "Closure Start", "Closure End", "Property Label", "App. Message", "Action"].map(h => <th key={h} style={thS}>{h}</th>)}
                </tr>
                <tr aria-hidden="true">
                  <td colSpan={8} style={{ padding: 0, height: 0 }}>
                    <div style={{ borderTop: "1.5px solid #B1B1B1", margin: "0 4px 8px" }} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {entries.map(e => (
                  <tr key={e.id} style={{ opacity: e.active ? 1 : 0.5 }}>
                    <td style={{ ...tdS, maxWidth: columnWidths.lob.maxWidth, minWidth: columnWidths.lob.minWidth, flex: columnWidths.lob.flex }}>{e.lob}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.affected.maxWidth, minWidth: columnWidths.affected.minWidth, flex: columnWidths.affected.flex }}>{affected(e.lob)}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.excluded.maxWidth, minWidth: columnWidths.excluded.minWidth, flex: columnWidths.excluded.flex }}>
                      <button onClick={event => { event.stopPropagation(); toggleExcludedPopover(e, event.currentTarget as HTMLElement); }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 999, background: "none", cursor: "pointer", fontSize: 14, color: "#242424", fontFamily: "GT Walsheim" }}>
                        {e.excludedLocations.length} <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </td>
                    <td style={{ ...tdS, maxWidth: columnWidths.closureStart.maxWidth, minWidth: columnWidths.closureStart.minWidth, flex: columnWidths.closureStart.flex }}>{e.closureStart}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.closureEnd.maxWidth, minWidth: columnWidths.closureEnd.minWidth, flex: columnWidths.closureEnd.flex }}>{e.closureEnd}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.propertyLabel.maxWidth, minWidth: columnWidths.propertyLabel.minWidth, flex: columnWidths.propertyLabel.flex }}>{e.propertyLabel}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.appMessage.maxWidth, minWidth: columnWidths.appMessage.minWidth, flex: columnWidths.appMessage.flex, wordBreak: "break-word" as const }}>{e.appMessage}</td>
                    <td style={{ ...tdS, maxWidth: columnWidths.action.maxWidth, minWidth: columnWidths.action.minWidth, flex: columnWidths.action.flex }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                        <button onClick={() => openEditForm(e)} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.0909 3.25229L9.5756 3.76755L3.33651 10.0066C3.00444 10.3387 2.79981 10.7771 2.75848 11.2449L2.65343 12.434C2.59866 13.054 3.11754 13.5729 3.73755 13.5181L4.92672 13.4131C5.39452 13.3718 5.83286 13.1671 6.16494 12.8351L12.404 6.59597L12.9193 6.08072C13.7003 5.29967 13.7003 4.03334 12.9193 3.25229C12.1382 2.47124 10.8719 2.47124 10.0909 3.25229Z" fill="#BD9DE9"></path>
                          <path d="M9.5756 3.76755L10.0909 3.25229C10.8719 2.47124 12.1382 2.47124 12.9193 3.25229C13.7003 4.03334 13.7003 5.29967 12.9193 6.08072L12.404 6.59597M9.5756 3.76755L3.33651 10.0066C3.00444 10.3387 2.79981 10.7771 2.75848 11.2449L2.65343 12.434C2.59866 13.054 3.11754 13.5729 3.73755 13.5181L4.92672 13.4131C5.39452 13.3718 5.83286 13.1671 6.16494 12.8351L12.404 6.59597M9.5756 3.76755L12.404 6.59597" stroke="#7029CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </button>
                        <button onClick={() => onUpdate(entries.filter(x => x.id !== e.id))} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" fill="#E46464"></path>
                        <path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" stroke="#E46464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14 4.00016H10.25M2 4.00016H5.75M5.75 4.00016V2.66683C5.75 1.93045 6.34695 1.3335 7.08333 1.3335H8.91667C9.65307 1.3335 10.25 1.93045 10.25 2.66683V4.00016M5.75 4.00016H10.25" stroke="#E46464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        </button>
                        <button onClick={() => onUpdate(entries.map(x => x.id === e.id ? { ...x, active: !x.active } : x))}
                          style={{ width: 33, height: 18, borderRadius: 999, background: e.active ? "#7029CF" : "#D0D0D0", position: "relative", border: "none", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                          <span style={{ position: "absolute", top: 1, left: e.active ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {popoverTarget && typeof document !== "undefined" ? createPortal(
        <div ref={popoverRef} style={{ position: "fixed", top: popoverTarget.top, left: popoverTarget.left, zIndex: 10001, background: "#fff", borderRadius: 6, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", minWidth: 220, maxWidth: 260, padding:"16px 16px 0px 16px"}}>
          {popoverLocations.length > 0 ? popoverLocations.map(location => (
            <div key={location} style={{ padding: "4px 32px", fontSize: 11, color: "#333", fontFamily: "GT Walsheim", whiteSpace: "nowrap" ,border:"1.5px solid #CACACA",borderRadius:"4px",marginBottom:"16px"}}>&#8226;{location}</div>
          )) : <div style={{ padding: "8px 14px", fontSize: 11, color: "#999", fontFamily: "GT Walsheim" }}>No excluded locations</div>}
        </div>,
        document.body
      ) : null}

      {isModalOpen && typeof document !== "undefined" ? createPortal(
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={closeModal}>
          <div style={{ background: "#fff", borderRadius: 22, minWidth: "70vw",maxWidth: "70vw", overflowY: "auto", padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#7029CF", margin: 0 }}>{editingEntry ? " LOB Closure" : " LOB Closure"}</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M6 18L18 6" stroke="#242424" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <LOBForm initial={editingEntry ?? undefined} onSave={handleSave} onCancel={closeModal} />
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
};

// ── Lock Card ─────────────────────────────────────────────────────────────────
const LockCardItem = ({ card, onDelete, onUpdate }: { card: LockCard; onDelete: () => void; onUpdate: (c: LockCard) => void }) => {
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#7029CF", margin: 0, paddingLeft: 22 }}>{card.lockName || "Add New Lock"}</h3>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", paddingLeft: 22, alignItems: "center" }}>
          <DateInput 
            fromValue={card.startDate} 
            toValue={card.endDate} 
            onFromChange={v => onUpdate({ ...card, startDate: v })} 
            onToChange={v => onUpdate({ ...card, endDate: v })}
            placeholderFrom="Select Date"
            placeholderTo="Select Date"
            layout="row"
            pillWidth={"clamp(15.625rem, 14rem + 4.3333vw, 18.875rem)"}
            pillHeight={50}
            pillBorderRadius={16}
            showLabels={true}
          />
          <button onClick={onDelete} style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "end", justifyContent: "center", transition: "background 0.2s" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M13.3332 6L12.0032 13.5642C11.8911 14.2017 11.3373 14.6667 10.69 14.6667H5.30966C4.66236 14.6667 4.10857 14.2017 3.99648 13.5642L2.6665 6" fill="#E46464"/><path d="M14 4H10.25M2 4H5.75M5.75 4V2.665C5.75 1.93 6.347 1.333 7.083 1.333H8.917C9.653 1.333 10.25 1.93 10.25 2.665V4M5.75 4H10.25" stroke="#E46464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div style={{ padding: "0 22px" }}>
          <div style={{ background: "#fff", borderRadius: 48, padding: "24px", boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)" }}>
            <LOBSection entries={card.lobEntries} onUpdate={entries => onUpdate({ ...card, lobEntries: entries })} />
          </div>
        </div>
      </div>
    </>
  );
};


// ── Month Helpers ─────────────────────────────────────────────────────────────
const parseCardDate = (str: string): Date | null => {
  if (!str) return null;
  const m = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  return isNaN(d.getTime()) ? null : d;
};

const countDaysInMonth = (startStr: string, endStr: string, monthIdx: number, year: number): number => {
  const start  = parseCardDate(startStr);
  const end    = parseCardDate(endStr);
  if (!start) return 0;
  const finish     = end ?? start;
  const monthStart = new Date(year, monthIdx, 1);
  const monthEnd   = new Date(year, monthIdx + 1, 0);
  const clampStart = start  > monthStart ? start  : monthStart;
  const clampEnd   = finish < monthEnd   ? finish : monthEnd;
  if (clampStart > clampEnd) return 0;
  return Math.round((clampEnd.getTime() - clampStart.getTime()) / 86400000) + 1;
};

// ── Main Component ────────────────────────────────────────────────────────────
const AvailabilityLockManager = ({ onClose }: { onClose: () => void }) => {
  const { setSelectedButton } = useNav();
  const [showModal, setShowModal]     = useState(true);
  const [lockCards, setLockCards]     = useState<LockCard[]>([]);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [activeTab, setActiveTab]     = useState(UNIQUE_COUNTRIES[0]);
  const [activeYear, setActiveYear]   = useState(new Date().getFullYear());

  useEffect(() => {
    setSelectedButton("Availability Lock Manager");
  }, [setSelectedButton]);

  const monthlyCounts: Record<string, number> = {};
  lockCards.forEach(c => {
    MONTH_SHORT.forEach((label, mi) => {
      const days = countDaysInMonth(c.startDate, c.endDate, mi, activeYear);
      if (days > 0) {
        monthlyCounts[label] = (monthlyCounts[label] || 0) + days;
      }
    });
  });

  const handleSave = (rows: LockRow[]) => {
    setLockCards(prev => [...prev, ...rows.map(r => ({ id: uid(), lockName: r.lockName, startDate: r.startDate, endDate: r.endDate, lobEntries: [] }))]);
    setShowModal(false);
  };

  const filtered = lockCards.filter(c => {
    // Check if lock has days in activeYear
    const hasDaysInYear = MONTH_SHORT.some((_, mi) => countDaysInMonth(c.startDate, c.endDate, mi, activeYear) > 0);
    if (!hasDaysInYear) return false;
    if (activeMonth) {
      const mi = MONTH_SHORT.indexOf(activeMonth);
      return mi !== -1 && countDaysInMonth(c.startDate, c.endDate, mi, activeYear) > 0;
    }
    return true;
  }).sort((a, b) => {
    const da = parseCardDate(a.startDate)?.getTime() || 0;
    const db = parseCardDate(b.startDate)?.getTime() || 0;
    return da - db;
  });

  const icons = [
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
      <path d="M16.3953 23.5053L16.388 23.5066L16.3407 23.53L16.3273 23.5326L16.318 23.53L16.2707 23.5066C16.2635 23.5044 16.2582 23.5055 16.2547 23.51L16.252 23.5166L16.2407 23.802L16.244 23.8153L16.2507 23.824L16.32 23.8733L16.33 23.876L16.338 23.8733L16.4073 23.824L16.4153 23.8133L16.418 23.802L16.4067 23.5173C16.4049 23.5102 16.4011 23.5062 16.3953 23.5053ZM16.572 23.43L16.5633 23.4313L16.44 23.4933L16.4333 23.5L16.4313 23.5073L16.4433 23.794L16.4467 23.802L16.452 23.8066L16.586 23.8686C16.5944 23.8709 16.6009 23.8691 16.6053 23.8633L16.608 23.854L16.5853 23.4446C16.5831 23.4366 16.5787 23.4318 16.572 23.43ZM16.0953 23.4313C16.0924 23.4295 16.0889 23.429 16.0855 23.4297C16.0822 23.4304 16.0792 23.4325 16.0773 23.4353L16.0733 23.4446L16.0507 23.854C16.0511 23.862 16.0549 23.8673 16.062 23.87L16.072 23.8686L16.206 23.8066L16.2127 23.8013L16.2153 23.794L16.2267 23.5073L16.2247 23.4993L16.218 23.4926L16.0953 23.4313Z" fill="#242424"></path>
      <path d="M15 21.3333C15 21.5985 15.1053 21.8529 15.2929 22.0404C15.4804 22.228 15.7347 22.3333 16 22.3333C16.2652 22.3333 16.5195 22.228 16.7071 22.0404C16.8946 21.8529 17 21.5985 17 21.3333V17H21.3333C21.5985 17 21.8529 16.8946 22.0404 16.7071C22.2279 16.5196 22.3333 16.2652 22.3333 16C22.3333 15.7348 22.2279 15.4804 22.0404 15.2929C21.8529 15.1053 21.5985 15 21.3333 15H17V10.6667C17 10.4014 16.8946 10.1471 16.7071 9.95955C16.5195 9.77201 16.2652 9.66666 16 9.66666C15.7347 9.66666 15.4804 9.77201 15.2929 9.95955C15.1053 10.1471 15 10.4014 15 10.6667V15H10.6666C10.4014 15 10.1471 15.1053 9.95952 15.2929C9.77198 15.4804 9.66663 15.7348 9.66663 16C9.66663 16.2652 9.77198 16.5196 9.95952 16.7071C10.1471 16.8946 10.4014 17 10.6666 17H15V21.3333Z" fill="#242424" stroke="#242424"></path>
    </svg>,
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
<path d="M20.1665 7.75C20.8073 7.75009 21.4224 8.00487 21.8755 8.45801C22.3284 8.91117 22.5835 9.52628 22.5835 10.167V23.5C22.5834 23.7672 22.4406 24.0143 22.2095 24.1484C21.9785 24.2825 21.6934 24.2836 21.4614 24.1514L15.9995 21.0293L10.5386 24.1514C10.3067 24.2838 10.0216 24.2822 9.79053 24.1484C9.55939 24.0143 9.41662 23.7672 9.4165 23.5V10.167C9.4165 9.52605 9.6713 8.91122 10.1245 8.45801C10.5777 8.00479 11.1926 7.75 11.8335 7.75H20.1665Z" fill="black"></path>
</svg>,
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#00FF8B"></path>
<path fillRule="evenodd" clipRule="evenodd" d="M19.2139 11.0002C19.707 10.5071 20.507 10.5071 21.0001 11.0002C21.4931 11.4933 21.4931 12.2932 21.0001 12.7863L17.9639 15.8215C17.8655 15.92 17.8655 16.0803 17.9639 16.1789L21.0001 19.214C21.4931 19.7071 21.4931 20.5071 21.0001 21.0002C20.507 21.4933 19.707 21.4933 19.2139 21.0002L16.1788 17.964C16.0802 17.8656 15.9199 17.8656 15.8213 17.964L12.7862 21.0002C12.2931 21.4933 11.4931 21.4933 11.0001 21.0002C10.507 20.5071 10.507 19.7071 11.0001 19.214L14.0362 16.1789C14.1346 16.0803 14.1346 15.92 14.0362 15.8215L11.0001 12.7863C10.507 12.2932 10.507 11.4933 11.0001 11.0002C11.4931 10.5071 12.2931 10.5071 12.7862 11.0002L15.8213 14.0363C15.9199 14.1347 16.0802 14.1347 16.1788 14.0363L19.2139 11.0002Z" fill="black"></path>
</svg>
  ];
  const iconActions = [() => setShowModal(true), () => {}, onClose];
  const iconTips    = ["Add New Lock", "Save All", "Close Lock Manager"];

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="almClip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.90 C0 0.98 0.015 1 0.035 1 H0.5348 H0.9638 C0.985 1 1 0.98 1 0.90 V0.24 C1 0.24 1 0.14 0.9638 0.14 H0.5701 C0.548 0.14 0.5348 0.10 0.5348 0.06 C0.5348 0.03 0.52 0 0.5 0 H0.035 C0.015 0 0 0.03 0 0.06 V0.90 Z"/>
          </clipPath>
        </defs>
      </svg>

      <div className="w-full min-h-screen bg-[#F7F7F7]" style={{ padding: "8px 64px 40px", position: "relative", fontFamily: "GT Walsheim" }}>

        {/* ── Right-side icons (fixed) ── */}
        <div style={{ position: "absolute", right: "16px", top: "clamp(220px, 25vh, 300px)", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "8px", zIndex: 30 }}>
          {icons.map((icon, i) => (
            <div key={i} style={{ position: "relative" }}>
              <button onClick={iconActions[i]}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", padding: 0 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; (e.currentTarget.nextElementSibling as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; (e.currentTarget.nextElementSibling as HTMLElement).style.opacity = "0"; }}>
                {icon}
              </button>
              <span style={{ position: "absolute", right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)", background: "#242424", color: "#fff", fontSize: 11, borderRadius: 6, padding: "4px 8px", whiteSpace: "nowrap", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none", fontWeight: 400, fontFamily: "GT Walsheim" }}>
                {iconTips[i]}
              </span>
            </div>
          ))}
        </div>

        {/* ── Country tabs: top-[11vh] when lock cards exist, no top offset otherwise ── */}
          <div
            className="absolute right-[calc(45%-250px)] z-40"
            style={{
              top: lockCards.length > 0 ? "65px" : undefined,
            }}
          >          <div className="flex bg-[#FFFFFF] rounded-full py-4 px-7 shadow-inner">
            {UNIQUE_COUNTRIES.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-full text-xs transition-all duration-300 ${activeTab === tab ? "bg-[#7029CF8F] text-[#242424] shadow-md" : "text-[#7029CF] hover:bg-[#E0CCFF]"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content column (monthly bar + main cards stacked) ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", alignItems: "center" }}>

          {/* Monthly bar — horizontal row */}
          {lockCards.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
              <YearDropdown
                selectedYear={activeYear}
                options={Array.from({ length: 5 }, (_, idx) => new Date().getFullYear() - 2 + idx)}
                onChange={setActiveYear}
              />

              {MONTH_SHORT.some(label => monthlyCounts[label] > 0) ? (
                MONTH_SHORT.map(label => {
                  const count = monthlyCounts[label];
                  if (!count) return null;
                  return (
                    <button key={label} onClick={() => setActiveMonth(activeMonth === label ? null : label)}
                      style={{ padding: "5px 14px", borderRadius: 999, border: "1.5px solid #D0D0D0", background: activeMonth === label ? "#242424" : "#CACACA", color: activeMonth === label ? "#fff" : "#333", fontSize: 12, fontWeight: activeMonth === label ? 700 : 500, cursor: "pointer", fontFamily: "GT Walsheim", transition: "all 0.2s" }}>
                      {label} ({count})
                    </button>
                  );
                })
              ) : (
                <span style={{ color: "#CACACA", fontSize: 12, fontFamily: "GT Walsheim" }}>
                  No lock days for {activeYear}
                </span>
              )}
            </div>
          )}

          {/* Individual Lock Cards as "Main Cards" */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
            {filtered.length === 0  && (
              <div style={{ width: "100%", minHeight: 600, backgroundColor: "white", clipPath: "url(#almClip)", WebkitClipPath: "url(#almClip)", boxShadow: "0 2px 24px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", padding: "40px 27px 40px 28px" }}>
                <h3 style={{ fontFamily: "Lora", fontStyle: "italic", fontWeight: 500, fontSize: 24, color: "#7029CF", margin: 0, paddingLeft: 22 }}>Add New Lock</h3>
              </div>
            )}
            
            {filtered.map((card, idx) => (
              <div key={card.id} style={{ 
                width: "100%", 
                backgroundColor: "white", 
                padding: "40px 27px 40px 28px", 
                boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
                borderRadius: idx === 0 ? 0 : 20,
                clipPath: idx === 0 ? "url(#almClip)" : "none",
                WebkitClipPath: idx === 0 ? "url(#almClip)" : "none",
                position: "relative",
                minHeight: 600,
              }}>
                <LockCardItem card={card}
                  onDelete={() => setLockCards(prev => prev.filter(c => c.id !== card.id))}
                  onUpdate={u => setLockCards(prev => prev.map(c => c.id === u.id ? u : c))} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <AddNewLockModal onSave={handleSave} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AvailabilityLockManager;