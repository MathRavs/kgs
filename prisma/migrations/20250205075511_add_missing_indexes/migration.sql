-- CreateIndex
CREATE INDEX "ShortenedUrls_key_idx" ON "ShortenedUrls" USING HASH ("key");

-- CreateIndex
CREATE INDEX "TemporaryAccessUrl_key_idx" ON "TemporaryAccessUrl" USING HASH ("key");
