-- AlterTable
ALTER TABLE `Ticket` MODIFY `status` ENUM('open', 'todo', 'closed') NOT NULL DEFAULT 'todo';
