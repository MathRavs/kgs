-- CreateTable
CREATE TABLE "TemporaryAccessUrl" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "accessed" BOOLEAN NOT NULL DEFAULT false,
    "shortenedUrlId" TEXT NOT NULL,

    CONSTRAINT "TemporaryAccessUrl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemporaryAccessUrl" ADD CONSTRAINT "TemporaryAccessUrl_shortenedUrlId_fkey" FOREIGN KEY ("shortenedUrlId") REFERENCES "ShortenedUrls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
