import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons.jsx";
import { useScrollLock } from "../hooks/useScrollLock.js";
import "./Sheet.css";

/** Painel inferior reutilizável (doação e comentários). */
export default function Sheet({ open, title, subtitle, onClose, children }) {
  const panelRef = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sheet" role="presentation">
      <div className="sheet__backdrop" onClick={onClose} />
      <div
        className="sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="sheet__grabber" aria-hidden="true" />

        <div className="sheet__head">
          <div className="sheet__heading">
            <h2 className="sheet__title">{title}</h2>
            {subtitle && <p className="sheet__subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="sheet__close"
            onClick={onClose}
            aria-label="Fechar painel"
          >
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
