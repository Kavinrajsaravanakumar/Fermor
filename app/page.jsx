"use client";
import Nav from "../components/Nav";
import Projector from "../components/Projector";
import SignupForm from "../components/SignupForm";
import Faq from "../components/Faq";
import { useEffect, useRef } from "react";

// Month labels for the hero dashboard bars
const barMonths = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const barHeights = [40, 52, 44, 61, 58, 67, 74, 86];

// Trust strip items with inline SVG icons
const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L3 5v5c0 4.42 3.07 8.56 7 9.54C14.93 18.56 18 14.42 18 10V5l-7-3z" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Read-only by default",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="9" width="10" height="8" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)"/>
        <path d="M7 9V7a3 3 0 016 0v2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="1" fill="var(--accent)"/>
      </svg>
    ),
    label: "Export or delete any time",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)"/>
        <path d="M10 7v4l2.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "No hidden fees",
  },
];

function HeroDashboard() {
  return (
    <div className="card snapshot" aria-label="Example Fermor dashboard" role="img">
      <div className="row">
        <span>Net worth</span>
        <b>₹18,42,300</b>
      </div>
      <p className="up">▲ ₹41,200 this month</p>
      <div className="bars" aria-hidden="true">
        {barHeights.map((h, i) => (
          <div key={i} className="bar-wrap" title={barMonths[i]}>
            <i style={{ height: h + "%" }} className={i === barHeights.length - 1 ? "bar-active" : ""} />
            <span className="bar-label">{barMonths[i]}</span>
          </div>
        ))}
      </div>
      <div className="goal">
        <div className="row">
          <span>Emergency fund</span>
          <span>82%</span>
        </div>
        <div className="track">
          <i style={{ width: "82%" }} />
        </div>
      </div>
      <div className="nudge">
        <b>Next step</b>
        Move ₹6,000 to savings before the 5th to stay on plan.
      </div>
    </div>
  );
}

export default function Home() {
  // Focus the email input when CTA "Get started" is clicked
  const emailRef = useRef(null);

  useEffect(() => {
    function handlePlannerLink(e) {
      const href = e.target?.getAttribute?.("href");
      if (href === "#plan") {
        // focus first slider after scroll settles
        setTimeout(() => {
          document.querySelector("#monthly-range")?.focus();
        }, 400);
      }
      if (href === "#start") {
        setTimeout(() => {
          document.querySelector("#waitlist-email")?.focus();
        }, 400);
      }
    }
    document.addEventListener("click", handlePlannerLink);
    return () => document.removeEventListener("click", handlePlannerLink);
  }, []);

  return (
    <>
      {/* Skip to main content — hidden until focused */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">

        {/* ── HERO ── */}
        <section className="hero wrap" aria-labelledby="hero-heading">
          <div>
            <p className="eyebrow">Personal finance, made clear</p>
            <h1 id="hero-heading">
              Know where you stand.<br />Know what to do next.
            </h1>
            <p className="lead">
              Fermor puts your accounts, spending and goals in one calm view —
              then tells you the one thing worth doing this week.
            </p>
            <div className="cta">
              <a href="#start" className="btn">Join the waitlist</a>
              <a href="#plan" className="btn ghost">Try the planner</a>
            </div>
            <p className="fine">Private beta — no card needed.</p>
          </div>
          <HeroDashboard />
        </section>

        {/* ── TRUST STRIP ── */}
        <section className="strip" aria-label="Key commitments">
          <div className="wrap stripin">
            {trustItems.map(({ icon, label }) => (
              <span key={label} className="trust-item">
                {icon}
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="product" className="wrap sec" aria-labelledby="features-heading">
          <h2 id="features-heading">See it, decide it, do it</h2>
          <p className="sublead">
            Most finance apps hand you a report and leave the work to you.
            Fermor ends every insight with a next action.
          </p>

          {/* Big feature card */}
          <div className="feature-main card" aria-label="Understand feature">
            <div className="feature-main-text">
              <span className="num">01</span>
              <h3>Understand — your whole picture, one screen</h3>
              <p>
                Connect your savings, current accounts and loans. Fermor reads them
                all, groups your spending automatically and shows you what actually
                changed this month — in plain language, not transaction codes.
              </p>
              <ul className="feat-list">
                <li>Net worth updated daily</li>
                <li>Spending grouped without manual tagging</li>
                <li>Alerts only when something genuinely matters</li>
              </ul>
            </div>
            <div className="feature-main-mock" aria-hidden="true">
              {/* Mini spending breakdown mock */}
              <div className="mock-card">
                <p className="mock-label">This month's spending</p>
                {[
                  { cat: "Housing", pct: 38, amt: "₹22,800" },
                  { cat: "Food", pct: 22, amt: "₹13,200" },
                  { cat: "Transport", pct: 14, amt: "₹8,400" },
                  { cat: "Subscriptions", pct: 8, amt: "₹4,800" },
                  { cat: "Everything else", pct: 18, amt: "₹10,800" },
                ].map(({ cat, pct, amt }) => (
                  <div key={cat} className="mock-row">
                    <span className="mock-cat">{cat}</span>
                    <div className="mock-bar-wrap">
                      <div className="mock-bar" style={{ width: pct + "%" }} />
                    </div>
                    <span className="mock-amt">{amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two smaller cards */}
          <div className="feature-grid2">
            <article className="card feat-card" aria-labelledby="feat-act">
              <span className="num">02</span>
              <h3 id="feat-act">Act — a short to-do list, not a dashboard to stare at</h3>
              <p>
                Each week Fermor surfaces one or two specific actions: move money,
                adjust a direct debit, or put a small amount aside. No decision
                fatigue, no jargon.
              </p>
              <ul className="feat-list">
                <li>Monthly plan set in under five minutes</li>
                <li>One clear next step, always visible</li>
              </ul>
            </article>
            <article className="card feat-card" aria-labelledby="feat-grow">
              <span className="num">03</span>
              <h3 id="feat-grow">Grow — goals with real timelines</h3>
              <p>
                Set a target — house deposit, travel fund, retirement cushion.
                Fermor works backwards to a monthly number and tracks it honestly,
                adjusting when life doesn't go to plan.
              </p>
              <ul className="feat-list">
                <li>Goals linked to actual savings</li>
                <li>Progress recalculated when you miss a month</li>
              </ul>
            </article>
          </div>
        </section>

        {/* ── PLANNER ── */}
        <section id="plan" className="band" aria-labelledby="planner-heading">
          <div className="wrap sec">
            <h2 id="planner-heading">See what small, steady investing can do</h2>
            <p className="sublead">
              Adjust the sliders. This is the kind of clarity Fermor gives you
              for your own goals.
            </p>
            <Projector />
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section id="who" className="wrap sec" aria-labelledby="who-heading">
          <h2 id="who-heading">Built for the gap between knowing and doing</h2>
          <p className="sublead">You don't need to be a spreadsheet person.</p>
          <div className="grid4 aud-grid">
            <article className="aud" aria-labelledby="aud-first">
              <h3 id="aud-first">First paycheck</h3>
              <p>
                Priya just started her first job. She earns well but spends
                without a plan. Fermor shows her, in ten minutes, that ₹5,000
                a month now is ₹30 lakh by 35.
              </p>
            </article>
            <article className="aud" aria-labelledby="aud-busy">
              <h3 id="aud-busy">Busy professionals</h3>
              <p>
                Rohan earns enough but "never gets round to it." He wants one
                view, one weekly decision, and the rest on autopilot. That's
                exactly the product we built.
              </p>
            </article>
            <article className="aud" aria-labelledby="aud-family">
              <h3 id="aud-family">Families</h3>
              <p>
                Deepa and her partner argue about money because they're looking
                at different numbers. Fermor puts them on the same screen with
                shared goals and separate spending views.
              </p>
            </article>
            <article className="aud" aria-labelledby="aud-self">
              <h3 id="aud-self">Self-employed</h3>
              <p>
                Arun's income spikes in some months and dips in others. Fermor
                plans around an average and flags when he needs to hold back
                rather than spend.
              </p>
            </article>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="wrap sec" aria-labelledby="how-heading">
          <h2 id="how-heading">How it works</h2>
          <ol className="steps">
            {[
              ["Connect", "Link your accounts in a few taps. Read-only unless you say otherwise; we can't move money without you."],
              ["Get your picture", "A clear snapshot of where you stand — net worth, spending, goals — usually in under five minutes."],
              ["Follow your plan", "Fermor gives you one or two specific actions each week. Small, concrete, and quietly compounding."],
            ].map(([t, d], i) => (
              <li key={t}>
                <span>{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── TRUST DETAIL ── */}
        <section id="trust" className="trust-band" aria-labelledby="trust-heading">
          <div className="wrap sec">
            <h2 id="trust-heading">Your money, your rules</h2>
            <p className="sublead">
              Finance runs on trust. Here's what we commit to.
            </p>
            <div className="grid3 trust-grid">
              <div className="trust-card">
                <h3>Private</h3>
                <p>
                  We don't sell your data to anyone. Export a full copy or
                  delete your account at any time — your request is processed
                  within 24 hours.
                </p>
              </div>
              <div className="trust-card">
                <h3>Read-only</h3>
                <p>
                  The connection to your bank is read-only by default. Fermor
                  can see your balances and transactions; it can't move money
                  unless you separately authorise a transfer.
                </p>
              </div>
              <div className="trust-card">
                <h3>Honest</h3>
                <p>
                  No hidden fees. No commission on anything we recommend. If a
                  feature costs money, we'll tell you before you hit a paywall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="wrap sec" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Questions</h2>
          <Faq />
        </section>

        {/* ── SIGN UP ── */}
        <section id="start" className="wrap sec final" aria-labelledby="signup-heading">
          <h2 id="signup-heading">Join the waitlist</h2>
          <p className="sublead">
            We're in private beta. Drop your email and we'll reach out when
            there's a spot for you.
          </p>
          <SignupForm />
          <p className="fine" style={{ marginTop: "16px" }}>
            No card. No spam. Unsubscribe any time.
          </p>
        </section>

      </main>

      <footer className="foot">
        <div className="wrap footin">
          <span className="logo">
            <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true" style={{ marginRight: "6px", verticalAlign: "middle" }}>
              <rect x="3" y="3" width="12" height="12" rx="2" fill="var(--accent)" transform="rotate(45 9 9)" />
            </svg>
            Fermor
          </span>
          <span>© 2026 Fermor. Illustrations are examples, not financial advice.</span>
        </div>
      </footer>
    </>
  );
}
