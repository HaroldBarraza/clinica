import * as z from "zod";

export const crear_pacienteschema = z.object({
  name_paciente: z
    .string({ message: "el nombre tiene que ser un string valido" })
    .trim()
    .min(3, "el nombre no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el nombre no puede tener caracteres especiales",
    }),
  appaterno_paciente: z
    .string({ message: "el apellido paterno tiene ser un string valido" })
    .trim()
    .min(3, "el apellido paterno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido paterno no puede tener caracteres especiales",
    }),
  apmaterno_paciente: z
    .string({ message: "el apellido materno tiene que ser un string valido" })
    .trim()
    .min(3, "el apellido materno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido materno no puede tener caracteres especiales",
    }),
  email: z
    .email({ message: "el correo no es valido" })
    .trim()
    .min(1, "el email no puede estar vacio"),
  telefono: z
    .string()
    .trim()
    .min(5, "el numero de telefono tiene que terner al menos 5 caracteres")
    .regex(/^[0-9+\-\s()]+$/, { message: "Telefono invalido" }),
  fecha_nacimiento: z.coerce
    .date()
    .max(new Date(), "la fecha de nacimiento no puede ser futura")
    .min(new Date("1900-01-01"), "la fecha de nacimiento es invalida"),
  genero: z
    .string()
    .transform((i) => i.toUpperCase())
    .pipe(z.enum(["MASCULINO", "FEMENINO"])),
});
export const updatepacienteschema = z.object({
  name_paciente: z
    .string({ message: "el nombre tiene que ser un string valido" })
    .trim()
    .min(3, "el nombre no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el nombre no puede tener caracteres especiales",
    })
    .optional(),
  appaterno_paciente: z
    .string({ message: "el apellido paterno tiene ser un string valido" })
    .trim()
    .min(3, "el apellido paterno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido paterno no puede tener caracteres especiales",
    })
    .optional(),
  apmaterno_paciente: z
    .string({ message: "el apellido materno tiene que ser un string valido" })
    .trim()
    .min(3, "el apellido materno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido materno no puede tener caracteres especiales",
    })
    .optional(),
  email: z
    .email({ message: "el correo no es valido" })
    .trim()
    .min(1, "el email no puede estar vacio")
    .optional(),
  telefono: z
    .string()
    .trim()
    .min(5, "el numero de telefono tiene que terner al menos 5 caracteres")
    .regex(/^[0-9+\-\s()]+$/, { message: "Telefono invalido" })
    .optional(),
  fecha_nacimiento: z.coerce
    .date()
    .max(new Date(), "la fecha de nacimiento no puede ser futura")
    .min(new Date("1900-01-01"), "la fecha de nacimiento es invalida")
    .optional(),
  genero: z
    .string()
    .transform((i) => i.toUpperCase())
    .pipe(z.enum(["MASCULINO", "FEMENINO"]))
    .optional(),
});
