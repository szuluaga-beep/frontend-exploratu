import * as z from "zod";

export const createTourSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  durationMinutes: z
    .number({ error: "Ingresa la duración" })
    .int("La duración debe ser en minutos enteros")
    .min(15, "La duración mínima es 15 minutos")
    .max(1440, "La duración máxima es 1440 minutos (24 horas)"),
  pricePerPerson: z
    .number({ error: "Ingresa el precio" })
    .min(0, "El precio no puede ser negativo"),
  maxCapacity: z
    .number({ error: "Ingresa la capacidad" })
    .int("La capacidad debe ser un número entero")
    .min(1, "La capacidad mínima es 1 persona")
    .max(500, "La capacidad máxima es 500 personas"),
  categoryId: z
    .number({ error: "Ingresa el ID de categoría" })
    .int()
    .min(1, "El ID de categoría debe ser mayor a 0"),
  cityId: z
    .number({ error: "Ingresa el ID de ciudad" })
    .int()
    .min(1, "El ID de ciudad debe ser mayor a 0"),
});

export type CreateTourInput = z.infer<typeof createTourSchema>;
