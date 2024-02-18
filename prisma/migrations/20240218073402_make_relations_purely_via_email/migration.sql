/*
  Warnings:

  - Added the required column `assignedTo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_assignee_fkey`;

-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `assignedTo` VARCHAR(191) NOT NULL;
