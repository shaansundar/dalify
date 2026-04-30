import { auth } from "@/lib/auth/config";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !req.auth) {
    return Response.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && req.auth) {
    return Response.redirect(new URL("/admin/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
