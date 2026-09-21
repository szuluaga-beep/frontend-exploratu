import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16">
      <h1 className="text-3xl font-semibold">
        ¡Bienvenido, {session.user.name}! 👋
      </h1>
      <p className="text-muted">{session.user.email}</p>
      <LogoutButton />
    </section>
  );
}
