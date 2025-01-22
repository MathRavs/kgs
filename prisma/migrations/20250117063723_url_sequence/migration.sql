/*
  Warnings:

  - You are about to drop the `GeneratedKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GeneratedKeys" DROP CONSTRAINT "GeneratedKeys_ownerId_fkey";

-- DropTable
DROP TABLE "GeneratedKeys";

-- Add a sequence in PostgreSQL
CREATE SEQUENCE url_sequence START 1;