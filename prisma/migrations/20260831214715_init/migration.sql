-- CreateEnum
CREATE TYPE "role" AS ENUM ('RECEPCIONISTA', 'MEDICO', 'GERENCIA');

-- CreateEnum
CREATE TYPE "genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "estado" AS ENUM ('PROGRAMADA', 'COMPLETADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "especialidades" (
    "id_especialidad" SERIAL NOT NULL,
    "name_especialidad" TEXT NOT NULL,
    "descripcion_especialidad" TEXT NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "users" (
    "id_empleado" SERIAL NOT NULL,
    "name_empleado" TEXT NOT NULL,
    "appaterno" TEXT NOT NULL,
    "appmaterno" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "id_especialidad" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "name_paciente" TEXT NOT NULL,
    "appaterno_paciente" TEXT NOT NULL,
    "apmaterno_paciente" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "genero" "genero" NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "estado_citas" (
    "id_estado" SERIAL NOT NULL,
    "name_estado" "estado" NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "estado_citas_pkey" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "citas" (
    "id_cita" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "creado_por" INTEGER NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_name_especialidad_key" ON "especialidades"("name_especialidad");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "especialidades"("id_especialidad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "users"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_citas"("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_creado_por_fkey" FOREIGN KEY ("creado_por") REFERENCES "users"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;
