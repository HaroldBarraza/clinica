/*
  Warnings:

  - You are about to drop the column `fecha_hora` on the `citas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "citas" DROP COLUMN "fecha_hora",
ADD COLUMN     "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hora" TIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id_estado" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
