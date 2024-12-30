-- CreateTable
CREATE TABLE "GeneratedKeys" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "GeneratedKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedKeys_key_key" ON "GeneratedKeys"("key");

-- AddForeignKey
ALTER TABLE "GeneratedKeys" ADD CONSTRAINT "GeneratedKeys_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
