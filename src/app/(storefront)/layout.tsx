import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { NavigationShell } from "@/components/layout/NavigationShell";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <AnnouncementBar />
      <NavigationShell />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
