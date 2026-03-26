"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MAIN_NAV, type NavItem } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function DropdownMenu({ item }: { readonly item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-medium text-charcoal transition-colors duration-150 hover:text-green"
      >
        {item.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Link>
      {open && item.children && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-md border border-sand-light bg-warm-white py-2 shadow-card-hover">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-charcoal transition-colors duration-150 hover:bg-cream hover:text-green"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  readonly onMobileMenuOpen: () => void;
}

export function Header({ onMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-light bg-warm-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={onMobileMenuOpen}
            className="p-2 text-charcoal md:hidden"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl font-semibold tracking-tight text-charcoal"
          >
            Dalify
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {MAIN_NAV.map((item) =>
              item.children ? (
                <DropdownMenu key={item.href} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-charcoal transition-colors duration-150 hover:text-green"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2 text-charcoal transition-colors duration-150 hover:text-green"
            aria-label="Shopping cart"
          >
            <CartIcon />
          </Link>
        </div>
      </Container>
    </header>
  );
}
