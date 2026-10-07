import "./globals.css";
import { Fraunces, Inter } from "next/font/google";

const serif = Fraunces({ subsets: ["latin"], variable: "--serif" });
const sans = Inter({ subsets: ["latin"], variable: "--sans" });

export const metadata = {
  title: "Fermor — Personal finance made clear",
  description:
    "Fermor puts your accounts, spending and goals in one calm view, then tells you the one thing worth doing this week. Join the private beta.",
  openGraph: {
    title: "Fermor — Personal finance made clear",
    description:
      "Know where you stand. Know what to do next. Join the Fermor waitlist.",
    url: "https://fermor.app",
    siteName: "Fermor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor — Personal finance made clear",
    description: "Know where you stand. Know what to do next.",
  },
  icons: {
    // Simple inline SVG favicon via data URI — no external file needed
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='6' y='6' width='20' height='20' rx='3' fill='%231f7a54' transform='rotate(45 16 16)'/></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
