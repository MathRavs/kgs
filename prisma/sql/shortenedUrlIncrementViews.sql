UPDATE "ShortenedUrls"
SET times_accessed = times_accessed + 1
WHERE key = $1;