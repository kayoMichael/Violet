-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `assignee` VARCHAR(300) NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assignee_fkey` FOREIGN KEY (`assignee`) REFERENCES `User`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;
