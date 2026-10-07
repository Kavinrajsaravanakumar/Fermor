# Fermor homepage — frontend assignment

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verify the production build passes
npm start       # serve the production build
```

Deploy: push to GitHub, import in Vercel, accept defaults — no environment variables needed.

---

## What I actually built

The brief was a homepage for Fermor, a personal-finance app. The starting point was a working skeleton; I treated it as a design critique + implementation task and worked through six areas:

### 1. Copy and structure

The original headings ("Three things, done properly", "Built for people who want clarity, not complexity") felt like placeholders, so I replaced them with product-led equivalents that say something specific: what the feature does and why it matters.

The feature section now has one large card with a mock spending breakdown UI, followed by two smaller cards. That breaks the "three identical checkmark cards" pattern the brief flagged, and the mock UI makes the product feel more tangible.

The audience section became four short stories — Priya, Rohan, Deepa, Arun — instead of one-liners. A name and a scenario is more memorable than a demographic label.

I removed claims I can't back up: "bank-grade encryption" is gone; "read-only by default" stays because it's specific and verifiable from how account aggregation works.

### 2. Visual direction

I picked one distinctive idea and committed to it: a small diamond/rotated-square mark (a single `<rect transform="rotate(45)">`) that appears in the nav, the footer, and as the favicon. It's small, but it's mine and it's consistent.

The hero dashboard got month labels on the bars, believable Indian-format numbers, and hover states. I added a `cardIn` entrance animation that fades and lifts the card in — with a `prefers-reduced-motion` override.

The trust strip went from three bare text strings to icon + label pairs, centered and evenly spaced.

The "Your money, your rules" section is now a dedicated dark band (`#0d1c15`) that's explicitly distinct from the page background in both light and dark mode — not just a slightly different card colour.

I moved from ad-hoc padding values to an 8px spacing scale (`--sp-1` through `--sp-12`) so vertical rhythm is consistent across sections.

### 3. Interaction

**Sign-up form** (`components/SignupForm.jsx` + `app/api/waitlist/route.js`): the form POSTs JSON to `/api/waitlist`. The route handler validates the email format, logs it to stdout, and returns JSON. Nothing is persisted — the README explains this. The form shows loading, success and error states, and the input is disabled while the request is in flight.

**Focus management**: clicking "Try the planner" or "Join the waitlist" from the nav/CTA scrolls to the section and then moves focus to the first slider or the email input respectively (via a small `useEffect` in page.jsx).

**FAQ accordion** (`components/Faq.jsx`): built with `<dl>/<dt>/<dd>`, `aria-expanded`, `aria-controls`, and an Escape-key handler. No third-party library.

### 4. Planner fixes

The `Slider` component was defined inside `Projector`, which meant React unmounted and remounted the `<input>` DOM node on every drag tick (breaking pointer capture). Moved it outside — that alone fixed the dragginess.

Added a `snap()` helper so slider values always land on a valid step. Added a `<input type="number">` next to each slider as a fallback. Set `aria-valuetext` to the formatted string so screen readers announce "₹10,000" not "10000". Default rate lowered to 8% with an inflation note below the slider.

### 5. Accessibility and responsiveness

- Mute colour raised from `#5d6b65` to `#4a5c53` (light) and `#8fa898` (dark) to clear WCAG AA 4.5:1 on their respective backgrounds.
- Skip-to-content link added.
- Nav links are `<ul>/<li>` now, not a flat sequence of anchors.
- Mobile menu closes on Escape (useEffect in Nav.jsx) and on any link click.
- All interactive elements have `min-height: 44px`.
- Checked at 360px: no horizontal scroll. `grid-template-columns: 1fr` at 520px, collapsed spacing at 360px.

### 6. What I'd do with more time

- **Persist the waitlist**: a one-liner Postgres insert or a Resend mailing-list call in the route handler.
- **Real animations**: the hero bars could animate in on scroll using an IntersectionObserver.
- **Actual dark mode toggle**: the site respects `prefers-color-scheme` automatically, but a toggle button would be better.
- **More planner polish**: a year-by-year table below the chart, and a "what does inflation do to this?" toggle.
- **Proper OG image**: a generated 1200×630 image via `next/og` so the social share looks good.
- **Tests**: a couple of Playwright tests covering the sign-up flow and the FAQ keyboard navigation.

---

## Files changed

| File | What changed |
|---|---|
| `app/page.jsx` | Full rewrite — new copy, structure, components |
| `app/globals.css` | Full rewrite — spacing scale, raised contrast, new components |
| `app/layout.jsx` | Added OG/Twitter metadata, SVG favicon |
| `app/api/waitlist/route.js` | New — POST handler, validates email, logs, returns JSON |
| `components/Nav.jsx` | Escape-to-close, semantic ul/li, logomark, aria attributes |
| `components/Projector.jsx` | Slider moved outside, snap helper, number input, aria-valuetext, default 8% |
| `components/SignupForm.jsx` | New — loading/success/error states |
| `components/Faq.jsx` | New — keyboard-accessible accordion |
| `README.md` | This file |

## What I couldn't verify

- The favicon data URI renders correctly in all browsers — it works in Chrome/Firefox but Safari historically has been picky about SVG data URIs in `<link rel="icon">`.
- The OG image shows the default Next.js placeholder (no `opengraph-image.jsx` was created) — social shares will show no image until that's added.
- The waitlist route logs to stdout only; in production on Vercel the logs appear in the Functions tab.
