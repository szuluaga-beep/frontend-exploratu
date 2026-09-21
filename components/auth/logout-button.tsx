"use client";

import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";

import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();

  return (
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
  );
}
