import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default function SignUpPage() {
  return (
    <AuthCard subtitle="Únete a Exploratu hoy mismo" title="Crear una cuenta">
      <SignUpForm />
    </AuthCard>
  );
}
