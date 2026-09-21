"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";

import { signOut, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Cargando...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16">
      <h1 className="text-3xl font-semibold">
        ¡Bienvenido, {session.user.name}! 👋
      </h1>
      <p className="text-muted">{session.user.email}</p>
      <Button
        variant="danger"
        onPress={() =>
          signOut().then(() => {
            router.push("/");
          })
        }
      >
        Cerrar sesión
      </Button>
    </section>
  );
}
