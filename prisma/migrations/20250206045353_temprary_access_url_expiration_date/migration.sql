/*
  Warnings:

  - Added the required column `expirationDate` to the `TemporaryAccessUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemporaryAccessUrl" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
