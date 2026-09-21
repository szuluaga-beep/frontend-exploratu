import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function SignInPage() {
  return (
    <AuthCard
      subtitle="Ingresa tus credenciales para continuar"
      title="Bienvenido de vuelta"
    >
      <SignInForm />
    </AuthCard>
  );
}
