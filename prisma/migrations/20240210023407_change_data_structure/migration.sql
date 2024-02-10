/*
  Warnings:

  - You are about to alter the column `status` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to alter the column `label` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `priority` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `status` ENUM('open', 'todo', 'closed') NOT NULL DEFAULT 'open',
    MODIFY `label` ENUM('Documentation', 'bug', 'feature') NOT NULL DEFAULT 'Documentation',
    MODIFY `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low';
