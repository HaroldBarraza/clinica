import * as z from "zod";
import { estado } from "../../prisma/generated/prisma/enums";

export const crear_cita = z.object({
  fecha_de_cita: z.coerce
    .date()
    .refine((i) => i >= new Date(), {
      message: "la fecha no puede ser una fecha pasada",
    })
    .transform((i) => {
      const normalizar = new Date(i);
      normalizar.setMilliseconds(0);
      return normalizar;
    }),
  hora_de_cita: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato debe ser HH:mm")
    .transform((str) => {
      const [hours, minutes] = str.split(":");
      const time = new Date();
      if (!hours || !minutes) return null;
      time.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return time;
    }),
  id_medico: z
    .number()
    .int({ message: "el id del medico tiene que ser un numero entero" })
    .positive({ message: "el id del medico tiene que ser un numero positivo" }),
  id_paciente: z
    .number({ message: "el id del paciente tiene que ser un numero" })
    .int({ message: "el id del paciente riene que ser un numero entero" })
    .positive({
      message: "el id de paciente tiene que ser un numero positivo",
    }),
  descripcion: z
    .string()
    .trim()
    .min(5, { message: "la decripcion no puede estar vacia minimo 5 caracteres" }),
});
export const filtrardoctorschema = z.object({
  fecha_inicio: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-01)",
    ),
  fecha_final: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-31)",
    ),
});

export const filterforbossschema = z.object({
  especialidad: z
    .string()
    .trim()
    .min(3, { message: "el parametro especialidad no puede estar vacio minino se necesita 3 caracteres" })
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "la especialidad no puede tener caracteres especiales o numeros",
    }),
  fecha_inicio: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-01)",
    ),
});

export const filtrarestadoschema = z.object({
  fecha_de_cita: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-01)",
    ),
});
export const updateestadoschema = z.object({
  estado: z
    .number({ message: "el estado tiene que ser un numero" })
    .int({ message: "el estado tiene que ser un numero entero" })
    .positive({ message: "el estado tiene que ser un numero positivo" })
    .refine((i) => [1, 2, 3].includes(i), {
      message:
        "El estado tiene que ser 1=PORGRAMADO, 2=COMPLETADA, 3=CANCELADA ",
    }),
});

export const repoteestadoschema = z.object({
  fecha_inicio: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-01)",
    ),
  fecha_final: z
    .string({ message: "La fecha debe ser un string" })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato debe ser YYYY-MM-DD (ejemplo: 2026-08-31)",
    ),
});
