import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/") && request.nextUrl.pathname.includes("/api/") && !request.nextUrl.pathname.endsWith(".json")) {
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Cache-Control", "no-transform");
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

