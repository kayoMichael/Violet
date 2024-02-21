-- DropIndex
DROP INDEX `Ticket_assignee_fkey` ON `Ticket`;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `assignedTo` TEXT NOT NULL;
