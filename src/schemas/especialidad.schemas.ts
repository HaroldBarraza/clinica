import * as z from "zod";

export const crear_especialidadschema = z.object({
  name_especialidad: z
    .string()
    .trim()
    .min(3, "el nombre de la especialidad no puede estar vacio o por lo menos 3 caracteres")
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/,
      "el nombre de la especialidad no puede tener numero no caracteres especiales",
    ),
  descripcion_especialidad: z.string().trim().min(5, "la no puede estar vacio se necesita como minimo 5 caracteres"),
});
