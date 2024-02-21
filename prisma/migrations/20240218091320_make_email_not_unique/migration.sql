/*
  Warnings:

  - Made the column `email` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Ticket_email_key` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `email` VARCHAR(191) NOT NULL;
