/*
  Warnings:

  - You are about to alter the column `status` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Text`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `status` TEXT NOT NULL;
