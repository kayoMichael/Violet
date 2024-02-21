/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - The required column `authorId` was added to the `Ticket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `assignedTo`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_authorId_key` ON `Ticket`(`authorId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
