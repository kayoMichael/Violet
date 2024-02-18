/*
  Warnings:

  - You are about to drop the column `authorId` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_authorId_fkey`;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `authorId`,
    ADD COLUMN `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_email_key` ON `Ticket`(`email`);
