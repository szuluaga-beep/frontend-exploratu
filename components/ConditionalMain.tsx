"use client";

import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      {children}
    </main>
  );
}
