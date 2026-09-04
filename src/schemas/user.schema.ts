import * as z from "zod";

export const findespecialidadschema = z.object({
  especialidad: z
    .string({ message: "la especialidad deber ser un string valido" })
    .trim()
    .min(3, "la especialidad no puede estar vacio, debe tener como minimo 3 caracteres")
});
export const updateuserschema = z.object({
  email: z
    .email({ message: "el correo no es valido" })
    .trim()
    .min(1, "el email no puede estar vacio")
    .optional(),
  password: z
    .string()
    .trim()
    .min(1, { message: "la contraseña no puede estar vacia" })
    .optional(),
  role: z
    .enum(["RECEPCIONISTA", "MEDICO", "GERENCIA"], {
      message: "El rol debe ser RECEPCIONISTA, MEDICO o GERENCIA",
    })
    .optional(),
  name_empleado: z
    .string({ message: "el nombre tiene que ser un string valido" })
    .trim()
    .min(3, "el nombre no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el nombre no puede tener caracteres especiales",
    })
    .optional(),
  appaterno: z
    .string({ message: "el apellido paterno tiene ser un string valido" })
    .trim()
    .min(3, "el apellido paterno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido paterno no puede tener caracteres especiales",
    })
    .optional(),
  appmaterno: z
    .string({ message: "el apellido materno tiene que ser un string valido" })
    .trim()
    .min(3, "el apellido materno no puede estar vacio, debe tener como minimo 3 caracteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido materno no puede tener caracteres especiales",
    })
    .optional(),
  telefono: z
    .string()
    .trim()
    .min(5, "el numero de telefono tiene que terner al menos 5 caracteres")
    .regex(/^[0-9+\-\s()]+$/, { message: "Telefono invalido" })
    .optional(),
});

export const createuserschema = z.object({
  email: z
    .email({ message: "el correo no es valido" })
    .trim()
    .min(1, "el email no puede estar vacio"),
  password: z
    .string()
    .trim()
    .min(1, { message: "la contraseña no puede estar vacia" }),
  role: z.enum(["RECEPCIONISTA", "MEDICO", "GERENCIA"], {
    message: "El rol debe ser RECEPCIONISTA, MEDICO o GERENCIA",
  }),
  name_empleado: z
    .string({ message: "el nombre tiene que ser un string valido" })
    .trim()
    .min(1, "el nombre no puede estar vacio")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el nombre no puede tener caracteres especiales",
    }),
  appaterno: z
    .string({ message: "el apellido paterno tiene ser un string valido" })
    .trim()
    .min(1, "el apellido paterno no puede estar vacio")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido paterno no puede tener caracteres especiales",
    }),
  appmaterno: z
    .string({ message: "el apellido materno tiene que ser un string valido" })
    .trim()
    .min(1, "el apellido materno no puede estar vacio")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, {
      message: "el apellido materno no puede tener caracteres especiales",
    }),
  telefono: z
    .string()
    .trim()
    .min(5, "el numero de telefono tiene que terner al menos 5 caracteres")
    .regex(/^[0-9+\-\s()]+$/, { message: "Telefono invalido" }),
  id_especialidad: z
    .number({ message: "el id_especialidad tiene que ser un numero" })
    .int({ message: "el id tiene que ser un numero entero" })
    .positive({ message: "el id tiene que ser un numero positivo" }),
});
