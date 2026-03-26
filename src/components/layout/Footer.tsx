import Link from "next/link";
import { FOOTER_NAV } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

function NewsletterForm() {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        Stay Updated
      </h3>
      <p className="mt-2 text-sm text-charcoal-muted">
        Get recipes, offers, and new arrivals in your inbox.
      </p>
      <form className="mt-4 flex gap-2" action="#" method="POST">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="min-w-0 flex-1 rounded-md border border-sand px-3 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-1"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="rounded-md bg-green px-4 py-2 text-sm font-medium text-warm-white transition-colors duration-150 hover:bg-green-light"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

interface FooterLinkGroupProps {
  readonly title: string;
  readonly links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-charcoal-muted transition-colors duration-150 hover:text-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sand-light bg-cream">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterLinkGroup title="Shop" links={FOOTER_NAV.shop} />
          <FooterLinkGroup title="Company" links={FOOTER_NAV.company} />
          <FooterLinkGroup title="Legal" links={FOOTER_NAV.legal} />
          <NewsletterForm />
        </div>

        <div className="mt-12 border-t border-sand pt-8 text-center text-sm text-charcoal-muted">
          <p>&copy; {new Date().getFullYear()} Dalify. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
