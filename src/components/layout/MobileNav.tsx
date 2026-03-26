"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MAIN_NAV, type NavItem } from "@/lib/navigation";

function AccordionItem({ item }: { readonly item: NavItem }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block border-b border-sand-light px-6 py-3 text-base font-medium text-charcoal transition-colors duration-150 hover:text-green"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-sand-light">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-3 text-base font-medium text-charcoal transition-colors duration-150 hover:text-green"
        aria-expanded={expanded}
      >
        {item.label}
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
          className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {expanded && (
        <div className="bg-cream pb-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-8 py-2 text-sm text-charcoal-muted transition-colors duration-150 hover:text-green"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface MobileNavProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform bg-warm-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-sand-light px-6 py-4">
          <span className="font-heading text-xl font-semibold text-charcoal">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-1 text-charcoal-muted transition-colors duration-150 hover:text-charcoal"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        {/* Nav links */}
        <nav className="overflow-y-auto" aria-label="Mobile navigation">
          {MAIN_NAV.map((item) => (
            <AccordionItem key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
}
