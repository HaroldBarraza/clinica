// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Iniciando seed con IDs desde 1...");

  // Limpieza
  await prisma.citas.deleteMany();
  await prisma.pacientes.deleteMany();
  await prisma.users.deleteMany();
  await prisma.estado_citas.deleteMany();
  await prisma.especialidades.deleteMany();

  // Resetear secuencias a 1 (por defecto en PostgreSQL)
  await prisma.$executeRawUnsafe(`
    ALTER SEQUENCE especialidades_id_especialidad_seq RESTART WITH 1;
    ALTER SEQUENCE users_id_empleado_seq RESTART WITH 1;
    ALTER SEQUENCE pacientes_id_paciente_seq RESTART WITH 1;
    ALTER SEQUENCE estado_citas_id_estado_seq RESTART WITH 1;
    ALTER SEQUENCE citas_id_cita_seq RESTART WITH 1;
  `);

  console.log("✅ Secuencias reseteadas a 1");

  // 1. ESPECIALIDADES (IDs: 1, 2, 3, 4, 5, 6)
  const especialidades = await prisma.especialidades.createMany({
    data: [
      { name_especialidad: "Cardiología", descripcion_especialidad: "Estudio del corazón y sistema cardiovascular" },
      { name_especialidad: "Pediatría", descripcion_especialidad: "Atención médica de niños y adolescentes" },
      { name_especialidad: "Dermatología", descripcion_especialidad: "Cuidado de la piel, cabello y uñas" },
      { name_especialidad: "Odontología", descripcion_especialidad: "Salud bucal y dentadura" },
      { name_especialidad: "Oftalmología", descripcion_especialidad: "Cuidado de los ojos y visión" },
      { name_especialidad: "Neurología", descripcion_especialidad: "Enfermedades del sistema nervioso" },
    ],
  });
  console.log(`✅ ${especialidades.count} especialidades creadas (IDs: 1-6)`);

  // 2. ESTADOS DE CITA (IDs: 1, 2, 3)
  const estados = await prisma.estado_citas.createMany({
    data: [
      { name_estado: "PROGRAMADA", descripcion: "Cita agendada pero no realizada" },
      { name_estado: "COMPLETADA", descripcion: "Cita realizada y finalizada" },
      { name_estado: "CANCELADA", descripcion: "Cita cancelada por paciente o médico" },
    ],
  });
  console.log(`✅ ${estados.count} estados de citas creados (IDs: 1-3)`);

  const passHash = await bcrypt.hash("123456", 10);

  // 3. MÉDICOS (IDs: 1, 2, 3, 4)
  const medicos = [
    {
      name_empleado: "Juan",
      appaterno: "Pérez",
      appmaterno: "López",
      email: "juan.perez@hospital.com",
      password: passHash,
      role: "MEDICO" as const,
      telefono: "555-1001",
      id_especialidad: 1, // Cardiología
    },
    {
      name_empleado: "Ana",
      appaterno: "García",
      appmaterno: "Ruiz",
      email: "ana.garcia@hospital.com",
      password: passHash,
      role: "MEDICO" as const,
      telefono: "555-1002",
      id_especialidad: 2, // Pediatría
    },
    {
      name_empleado: "Carlos",
      appaterno: "Martínez",
      appmaterno: "Sánchez",
      email: "carlos.martinez@hospital.com",
      password: passHash,
      role: "MEDICO" as const,
      telefono: "555-1003",
      id_especialidad: 3, // Dermatología
    },
    {
      name_empleado: "María",
      appaterno: "López",
      appmaterno: "Hernández",
      email: "maria.lopez@hospital.com",
      password: passHash,
      role: "MEDICO" as const,
      telefono: "555-1004",
      id_especialidad: 4, // Odontología
    },
  ];

  const medicosCreados = await prisma.users.createMany({ data: medicos });
  console.log(`✅ ${medicosCreados.count} médicos creados (IDs: 1-4)`);

  // 4. RECEPCIONISTAS (IDs: 5, 6)
  const recepcionistas = [
    {
      name_empleado: "Laura",
      appaterno: "Martínez",
      appmaterno: "Sánchez",
      email: "laura.martinez@hospital.com",
      password: passHash,
      role: "RECEPCIONISTA" as const,
      telefono: "555-2001",
    },
    {
      name_empleado: "Diego",
      appaterno: "Rodríguez",
      appmaterno: "Flores",
      email: "diego.rodriguez@hospital.com",
      password: passHash,
      role: "RECEPCIONISTA" as const,
      telefono: "555-2002",
    },
  ];

  const recepcionistasCreados = await prisma.users.createMany({ data: recepcionistas });
  console.log(`✅ ${recepcionistasCreados.count} recepcionistas creados (IDs: 5-6)`);

  // 5. GERENCIA (ID: 7)
  const gerencia = [
    {
      name_empleado: "Roberto",
      appaterno: "Hernández",
      appmaterno: "Vega",
      email: "roberto.hernandez@hospital.com",
      password: passHash,
      role: "GERENCIA" as const,
      telefono: "555-3001",
    },
  ];

  const gerenciaCreada = await prisma.users.createMany({ data: gerencia });
  console.log(`✅ ${gerenciaCreada.count} gerente creado (ID: 7)`);

  // 6. PACIENTES (IDs: 1, 2, 3, 4, 5)
  const pacientes = [
    {
      name_paciente: "María",
      appaterno_paciente: "Fernández",
      apmaterno_paciente: "Díaz",
      email: "maria.fernandez@email.com",
      telefono: "555-4001",
      fecha_nacimiento: new Date("1985-05-15"),
      genero: "FEMENINO" as const,
    },
    {
      name_paciente: "Roberto",
      appaterno_paciente: "Castillo",
      apmaterno_paciente: "Mendoza",
      email: "roberto.castillo@email.com",
      telefono: "555-4002",
      fecha_nacimiento: new Date("1990-08-22"),
      genero: "MASCULINO" as const,
    },
    {
      name_paciente: "Sofia",
      appaterno_paciente: "González",
      apmaterno_paciente: "Ramírez",
      email: "sofia.gonzalez@email.com",
      telefono: "555-4003",
      fecha_nacimiento: new Date("1992-03-10"),
      genero: "FEMENINO" as const,
    },
    {
      name_paciente: "Miguel",
      appaterno_paciente: "Sánchez",
      apmaterno_paciente: "Torres",
      email: "miguel.sanchez@email.com",
      telefono: "555-4004",
      fecha_nacimiento: new Date("1988-12-05"),
      genero: "MASCULINO" as const,
    },
    {
      name_paciente: "Alejandra",
      appaterno_paciente: "Ruiz",
      apmaterno_paciente: "Castro",
      email: "alejandra.ruiz@email.com",
      telefono: "555-4005",
      fecha_nacimiento: new Date("1995-07-20"),
      genero: "FEMENINO" as const,
    },
  ];

  const pacientesCreados = await prisma.pacientes.createMany({ data: pacientes });
  console.log(`✅ ${pacientesCreados.count} pacientes creados (IDs: 1-5)`);

  // 7. CITAS (IDs: 1, 2, 3, 4, 5)
  const citas = [
    {
      id_paciente: 1,
      descripcion: "Consulta general de control cardíaco",
      id_medico: 1,
      id_estado: 1, // PROGRAMADA
      fecha_creacion: new Date("2026-09-01"),
      fecha_de_cita: new Date("2026-09-10"),
      hora_de_cita: new Date("2026-09-10T10:00:00"),
      creado_por: 5,
    },
    {
      id_paciente: 2,
      descripcion: "Revisión pediátrica",
      id_medico: 2,
      id_estado: 2, // COMPLETADA
      fecha_creacion: new Date("2026-08-25"),
      fecha_de_cita: new Date("2026-08-28"),
      hora_de_cita: new Date("2026-08-28T15:30:00"),
      creado_por: 5,
    },
    {
      id_paciente: 3,
      descripcion: "Consulta dermatológica",
      id_medico: 3,
      id_estado: 1, // PROGRAMADA
      fecha_creacion: new Date("2026-09-02"),
      fecha_de_cita: new Date("2026-09-15"),
      hora_de_cita: new Date("2026-09-15T14:00:00"),
      creado_por: 5,
    },
    {
      id_paciente: 4,
      descripcion: "Limpieza dental",
      id_medico: 4,
      id_estado: 3, // CANCELADA
      fecha_creacion: new Date("2026-08-20"),
      fecha_de_cita: new Date("2026-08-25"),
      hora_de_cita: new Date("2026-08-25T11:00:00"),
      creado_por: 5,
    },
    {
      id_paciente: 5,
      descripcion: "Seguimiento post-consulta",
      id_medico: 1,
      id_estado: 1, // PROGRAMADA
      fecha_creacion: new Date("2026-09-03"),
      fecha_de_cita: new Date("2026-09-20"),
      hora_de_cita: new Date("2026-09-20T09:30:00"),
      creado_por: 6,
    },
  ];

  const citasCreadas = await prisma.citas.createMany({ data: citas });
  console.log(`✅ ${citasCreadas.count} citas creadas (IDs: 1-5)`);

  console.log("\n📋 RESUMEN DE DATOS CREADOS:");
  console.log("├─ Especialidades: IDs 1-6");
  console.log("├─ Estados de Cita: IDs 1-3");
  console.log("├─ Médicos: IDs 1-4");
  console.log("├─ Recepcionistas: IDs 5-6");
  console.log("├─ Gerencia: ID 7");
  console.log("├─ Pacientes: IDs 1-5");
  console.log("└─ Citas: IDs 1-5");
  console.log("\n🎉 Seed completado exitosamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });