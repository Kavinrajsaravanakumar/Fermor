"use client";
import { useState, useEffect, useRef } from "react";

const links = [
  ["Product", "#product"],
  ["Plan", "#plan"],
  ["Who it's for", "#who"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header className="nav" ref={navRef}>
      <div className="wrap navin">
        <a href="#top" className="logo" aria-label="Fermor — home">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false" style={{ marginRight: "8px", verticalAlign: "middle" }}>
            <rect x="3" y="3" width="12" height="12" rx="2" fill="var(--accent)" transform="rotate(45 9 9)" />
          </svg>
          Fermor
        </a>
        <nav aria-label="Main navigation">
          <ul className={open ? "links open" : "links"} role="list">
            {links.map(([t, h]) => (
              <li key={h}>
                <a href={h} onClick={close}>{t}</a>
              </li>
            ))}
            <li>
              <a href="#start" className="btn small" onClick={close}>Get started</a>
            </li>
          </ul>
        </nav>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
