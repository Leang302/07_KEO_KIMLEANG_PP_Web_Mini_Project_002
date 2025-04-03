// src/middleware.js
import { NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = async (request) => {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/todo", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/todo/:path*"],
};
