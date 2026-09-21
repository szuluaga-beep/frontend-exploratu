"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FieldError, Input, Label, Spinner, TextField } from "@heroui/react";
import NextLink from "next/link";
import { Controller, useForm } from "react-hook-form";

import { signUp, useSession } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/schemas/sign-up.schema";

export function SignUpForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirigir si ya tiene sesión activa
  useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  const onSubmit = async (data: SignUpInput) => {
    try {
      const result = await signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (result.error) {
        setError("root.serverError", {
          message: result.error.message ?? "Error al crear la cuenta",
        });
        return;
      }

      router.push("/dashboard");
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
        name="name"
        render={({ field, fieldState }) => (
          <TextField
            isInvalid={!!fieldState.error}
            name={field.name}
            type="text"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            <Label>Nombre completo</Label>
            <Input autoComplete="name" placeholder="Tu nombre" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            isInvalid={!!fieldState.error}
            name={field.name}
            type="email"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
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
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            <Label>Contraseña</Label>
            <Input autoComplete="new-password" placeholder="••••••••" />
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextField
            isInvalid={!!fieldState.error}
            name={field.name}
            type={showConfirm ? "text" : "password"}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            <Label>Confirmar contraseña</Label>
            <Input autoComplete="new-password" placeholder="••••••••" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </TextField>
        )}
      />

      <button
        className="text-xs text-accent hover:underline self-start -mt-2"
        type="button"
        onClick={() => setShowConfirm((prev) => !prev)}
      >
        {showConfirm ? "Ocultar" : "Mostrar"} contraseña
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
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )
        }
      </Button>

      <p className="text-sm text-center text-muted">
        ¿Ya tienes cuenta?{" "}
        <NextLink className="link text-accent" href="/sign-in">
          Inicia sesión
        </NextLink>
      </p>
    </form>
  );
}
