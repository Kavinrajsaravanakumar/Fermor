"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Is Fermor actually free?",
    a: "The core features — connecting accounts, tracking spending, and setting goals — are free. We plan a paid tier for advanced investing tools, but we'll be upfront about pricing before we charge anything.",
  },
  {
    q: "How does Fermor connect to my bank?",
    a: "We use read-only connections via account aggregation. We can see your transactions and balances; we cannot move money unless you explicitly authorise a transaction.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "You can export everything as a CSV and delete your account at any time. We don't hold your data hostage.",
  },
  {
    q: "The planner showed me a big number. Can I trust it?",
    a: "The planner is an illustration of compounding, not a forecast. Real returns fluctuate, years of high inflation can erode gains, and nothing here is financial advice. Use it to build intuition, not to set a retirement date.",
  },
  {
    q: "When will Fermor launch?",
    a: "We're in private beta. Join the waitlist and we'll let you know when a spot opens for you.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <dl className="faq">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? " faq-open" : ""}`}>
            <dt>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-body-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && isOpen) setOpen(null);
                }}
              >
                {item.q}
                <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </dt>
            {isOpen && (
              <dd
                id={`faq-body-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <p>{item.a}</p>
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
