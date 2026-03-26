"use client";

import { useState } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function NavigationShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Header onMobileMenuOpen={() => setMobileNavOpen(true)} />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
