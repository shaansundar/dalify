"use client";

import { useState } from "react";

interface AnnouncementBarProps {
  readonly message?: string;
}

export function AnnouncementBar({
  message = "Free shipping on orders above ₹499 — Shop now!",
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gold px-4 py-2 text-center text-sm font-medium text-warm-white">
      <p>{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-white/80 transition-colors duration-150 hover:text-warm-white"
        aria-label="Dismiss announcement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
