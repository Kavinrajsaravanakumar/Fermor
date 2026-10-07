"use client";
import { useState, useRef } from "react";

export default function SignupForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = inputRef.current?.value?.trim();
    if (!email) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg("You're on the list. We'll be in touch.");
        inputRef.current.value = "";
      } else {
        setStatus("error");
        setMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="signup-ok" role="status">
        {msg}
      </p>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <input
        ref={inputRef}
        id="waitlist-email"
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
        required
        disabled={status === "loading"}
      />
      <button className="btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
      {status === "error" && (
        <p className="signup-err" role="alert">{msg}</p>
      )}
    </form>
  );
}
