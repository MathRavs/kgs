/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `TemporaryAccessUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TemporaryAccessUrl_key_key" ON "TemporaryAccessUrl"("key");
