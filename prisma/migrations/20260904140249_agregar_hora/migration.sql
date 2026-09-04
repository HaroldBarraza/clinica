/*
  Warnings:

  - You are about to drop the column `fecha` on the `citas` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `citas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "citas" DROP COLUMN "fecha",
DROP COLUMN "hora",
ADD COLUMN     "fecha_de_cita" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hora_de_cita" TIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;
