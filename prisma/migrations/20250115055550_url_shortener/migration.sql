/*
  Warnings:

  - Added the required column `name` to the `GeneratedKeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratedKeys" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ShortenedUrls" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ShortenedUrls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrls_key_key" ON "ShortenedUrls"("key");

-- AddForeignKey
ALTER TABLE "ShortenedUrls" ADD CONSTRAINT "ShortenedUrls_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
