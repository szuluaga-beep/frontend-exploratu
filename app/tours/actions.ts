"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { createTour } from "@/lib/api/tours";
import { createTourSchema, type CreateTourInput } from "@/lib/schemas/tour.schema";
import type { Tour } from "@/types/tours";

export type CreateTourActionResult =
  | { success: true; tour: Tour }
  | { success: false; message: string };

/**
 * Server Action: creates a tour by calling the backend API from the server.
 * The session token is read server-side — never exposed to the client.
 */
export async function createTourAction(
  data: CreateTourInput,
): Promise<CreateTourActionResult> {
  // Validate on the server as well (defense in depth)
  const parsed = createTourSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Los datos enviados son inválidos.",
    };
  }

  // Get the session token server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = session?.session?.token;
  if (!token) {
    return {
      success: false,
      message: "No tienes permiso para crear tours. Inicia sesión de nuevo.",
    };
  }

  try {
    const tour = await createTour(parsed.data, token);
    return { success: true, tour };
  } catch (err: unknown) {
    // Extract backend error message if available
    const axiosError = err as {
      response?: { status?: number; data?: { message?: string; error?: string } };
    };
    const status = axiosError?.response?.status;
    const body = axiosError?.response?.data;
    const backendMsg = body?.message ?? body?.error;

    if (backendMsg) return { success: false, message: backendMsg };
    if (status === 401)
      return {
        success: false,
        message: "No tienes permiso para crear tours. Inicia sesión de nuevo.",
      };
    if (status === 400)
      return {
        success: false,
        message: "Los datos enviados son inválidos. Revisa el formulario.",
      };
    if (status === 422)
      return {
        success: false,
        message: "Error de validación en el servidor. Revisa los campos.",
      };
    if (status === 500)
      return {
        success: false,
        message: "Error interno del servidor. Intenta más tarde.",
      };

    return { success: false, message: "No se pudo crear el tour. Intenta de nuevo." };
  }
}
