"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldError, Input, Label, Spinner, TextField } from "@heroui/react";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";

import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/lib/schemas/sign-in.schema";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInput) => {
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError("root.serverError", {
          message: result.error.message ?? "Credenciales inválidas",
        });

        return;
      }

      router.push(callbackUrl);
    } catch {
      setError("root.serverError", {
        message: "Ocurrió un error inesperado. Intenta de nuevo.",
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            isInvalid={!!fieldState.error}
            name={field.name}
            type="email"
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
          >
            <Label>Correo electrónico</Label>
            <Input autoComplete="email" placeholder="tu@email.com" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            isInvalid={!!fieldState.error}
            name={field.name}
            type={showPassword ? "text" : "password"}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
          >
            <Label>Contraseña</Label>
            <Input autoComplete="current-password" placeholder="••••••••" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <button
        className="text-xs text-accent hover:underline self-start -mt-2"
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? "Ocultar" : "Mostrar"} contraseña
      </button>

      {errors.root?.serverError && (
        <p className="text-sm text-danger text-center rounded-lg bg-danger/10 px-3 py-2">
          {errors.root.serverError.message}
        </p>
      )}

      <Button
        className="w-full mt-2"
        fullWidth
        isDisabled={isSubmitting}
        isPending={isSubmitting}
        type="submit"
      >
        {({ isPending: pending }) =>
          pending ? (
            <>
              <Spinner color="current" size="sm" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )
        }
      </Button>

      <p className="text-sm text-center text-muted">
        ¿No tienes cuenta?{" "}
        <NextLink className="link text-accent" href="/sign-up">
          Regístrate
        </NextLink>
      </p>
    </form>
  );
}
