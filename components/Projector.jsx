"use client";
import { useState, useRef, useEffect } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function project(monthly, rate, years) {
  const r = rate / 100 / 12;
  const pts = [];
  let bal = 0;
  for (let m = 0; m <= years * 12; m++) {
    if (m % 12 === 0) pts.push(bal);
    bal = bal * (1 + r) + monthly;
  }
  return pts;
}

function snap(v, min, max, step) {
  const clamped = Math.min(max, Math.max(min, v));
  return Math.round((clamped - min) / step) * step + min;
}

function Slider({ id, label, value, set, min, max, step, format, hint }) {
  const rangeRef = useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  // Keep the uncontrolled range thumb in sync when value changes
  // from outside (e.g. the number input), without touching it during drag.
  useEffect(() => {
    if (rangeRef.current && rangeRef.current !== document.activeElement) {
      rangeRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="slider">
      <div className="slider-head">
        <label htmlFor={`${id}-range`}><b>{label}</b></label>
        {/* Number input — fully controlled, snaps on change */}
        <input
          id={`${id}-num`}
          className="slider-num"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => set(snap(parseFloat(e.target.value) || min, min, max, step))}
          aria-label={`${label} — type a value`}
        />
      </div>
      {/* Range input — UNCONTROLLED so the browser owns the thumb during drag */}
      <input
        ref={rangeRef}
        id={`${id}-range`}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--line) ${pct}%, var(--line) 100%)`,
        }}
        aria-valuetext={format(value)}
        onInput={(e) => set(+e.target.value)}
      />
      {hint && <p className="slider-hint">{hint}</p>}
    </div>
  );
}

export default function Projector() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(8);

  const pts = project(monthly, rate, years);
  const total = pts[pts.length - 1];
  const put = monthly * years * 12;
  const gain = Math.max(total - put, 0);

  const W = 520, H = 180;
  const maxPt = Math.max(...pts, 1);
  const xi = (i) => (i / (pts.length - 1)) * W;
  const yi = (v) => H - (v / maxPt) * (H - 10) - 4;
  const line = pts.map((v, i) => `${i ? "L" : "M"}${xi(i).toFixed(1)},${yi(v).toFixed(1)}`).join(" ");
  const rateDisplay = rate % 1 === 0 ? `${rate}%` : `${rate.toFixed(1)}%`;

  return (
    <div className="projector">
      <div className="controls">
        <Slider id="monthly" label="Invest each month" value={monthly} set={setMonthly} min={1000} max={100000} step={500} format={fmt} />
        <Slider id="years" label="For how long" value={years} set={setYears} min={1} max={30} step={1} format={(v) => `${v} years`} />
        <Slider
          id="rate"
          label="Expected annual return"
          value={rate}
          set={setRate}
          min={4}
          max={15}
          step={0.5}
          format={(v) => `${v % 1 === 0 ? v : v.toFixed(1)}% per year`}
          hint="Inflation typically runs 4–6%. A real return above that isn't guaranteed."
        />
        <p className="fine">An illustration, not a promise. Real returns vary and can be negative.</p>
      </div>

      <div className="result">
        <p className="label">After {years} year{years !== 1 ? "s" : ""} you could have</p>
        <p className="big">{fmt(total)}</p>
        <p className="sub">{fmt(put)} from you &nbsp;·&nbsp; {fmt(gain)} from growth</p>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Projected growth chart: ${fmt(total)} after ${years} years`} className="proj-chart">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#chartFill)" />
          <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <p className="proj-meta">Rate used: {rateDisplay} &nbsp;·&nbsp; {years * 12} monthly contributions</p>
      </div>
    </div>
  );
}
