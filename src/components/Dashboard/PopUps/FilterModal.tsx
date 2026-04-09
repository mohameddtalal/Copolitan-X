import React from "react";

type Option = {
  key: string;
  label: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  options: Option[];
  pendingFields: Set<string>;
  setPendingFields: React.Dispatch<React.SetStateAction<Set<string>>>;
  onApply: (fields: Set<string>) => void;
  title?: string;
};

export default function FilterModal({
  show,
  onClose,
  options,
  pendingFields,
  setPendingFields,
  onApply,
  title = "Custom Visible Fields"
}: Props) {
  if (!show) return null;

  const ALL_KEYS = options.filter(o => o.key !== "all").map(o => o.key);
  const allChecked = ALL_KEYS.every(k => pendingFields.has(k));

  return (
    <div
  className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  onClick={onClose}
>
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: 40,
      padding: "36px 40px",
      width: "min(380px, 92vw)",
      position: "relative",
      boxShadow: "0 8px 48px rgba(112,41,207,0.18)"
    }}
    onClick={e => e.stopPropagation()}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28
      }}
    >
      <h2
        style={{
          fontFamily: "Lora",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 22,
          color: "#7029CF",
          margin: 0
        }}
      >
        {title}
      </h2>

      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20,
          color: "#aaa",
          lineHeight: 1,
          padding: 4,
          transition: "color 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#555")}
        onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
      >
        ✕
      </button>
    </div>

    {/* Checkboxes */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginBottom: 20
      }}
    >
      {options.map(({ key, label }) => {
        const isAll = key === "all";
        const checked = isAll ? allChecked : pendingFields.has(key);

        const toggle = () => {
          if (isAll) {
            setPendingFields(allChecked ? new Set() : new Set(ALL_KEYS));
          } else {
            setPendingFields(prev => {
              const next = new Set(prev);
              next.has(key) ? next.delete(key) : next.add(key);
              return next;
            });
          }
        };

        return (
          <label
            key={key}
            onClick={toggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              fontSize: 14,
              color: "#333",
              fontFamily: "GT Walsheim",
              fontWeight: 400,
              userSelect: "none"
            }}
          >
            {/* Custom Checkbox */}
            <span
              style={{
                width: 20,
                height: 20,
                minWidth: 20,
                borderRadius: 5,
                border: checked ? "none" : "2px solid #CACACA",
                background: checked ? "#7029CF" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, border 0.2s",
                flexShrink: 0
              }}
            >
              {checked && (
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path
                    d="M1 4L4.5 7.5L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            {label}
          </label>
        );
      })}
    </div>

    {/* Buttons */}
    <div style={{ display: "flex", gap: 12 }}>
      <button
        onClick={() => onApply(new Set(pendingFields))}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: 999,
          border: "none",
          background: "#7029CF",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "GT Walsheim",
          transition: "opacity 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        Apply
      </button>

      <button
        onClick={onClose}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: 999,
          border: "2px solid #7029CF",
          background: "none",
          color: "#7029CF",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "GT Walsheim",
          transition: "background 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#F7F3FF")}
        onMouseLeave={e => (e.currentTarget.style.background = "none")}
      >
        Cancel
      </button>
    </div>
  </div>
</div>
  );
}