import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminSession = request.cookies.get("admin-session")

  // Redirect unauthenticated users trying to access protected /admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Redirect authenticated users away from the login page
  if (pathname === "/admin/login") {
    if (adminSession && adminSession.value === "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"], // Do NOT include /admin/login explicitly
}
