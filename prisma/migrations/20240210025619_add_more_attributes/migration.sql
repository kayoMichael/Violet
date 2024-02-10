/*
  Warnings:

  - You are about to alter the column `status` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Enum(EnumId(0))`.
  - You are about to alter the column `label` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `status` ENUM('backlog', 'todo', 'in_progress', 'done', 'canceled', 'open') NOT NULL DEFAULT 'open',
    MODIFY `label` ENUM('documentation', 'bug', 'feature') NOT NULL DEFAULT 'documentation';
