import type { NextRequest } from "next/server";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

// Rutas que requieren sesión activa
const PROTECTED_ROUTES = ["/dashboard"];

// Rutas de autenticación — redirigen al dashboard si ya hay sesión
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Solo procesar si la ruta nos interesa
  if (!isProtected && !isAuthRoute) {
    return NextResponse.next();
  }

  // Validación real con DB — disponible en Next.js 16 (Node.js runtime)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (isProtected && !session) {
    // Redirigir a login conservando la URL de destino para post-login
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && session) {
    // Usuario ya autenticado — redirigir al dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
