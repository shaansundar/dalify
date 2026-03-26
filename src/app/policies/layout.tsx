import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "Refund & Return Policy", href: "/policies/refund" },
  { label: "Shipping Policy", href: "/policies/shipping" },
] as const;

export default function PoliciesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Container className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Policy pages">
          {POLICY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-cream-dark px-4 py-1.5 text-xs font-medium text-charcoal-muted transition-colors hover:border-green hover:text-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <article className="prose-dalify">{children}</article>
      </div>
    </Container>
  );
}
