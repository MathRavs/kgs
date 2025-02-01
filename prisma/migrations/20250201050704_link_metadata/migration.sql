-- AlterTable
ALTER TABLE "ShortenedUrls" ADD COLUMN     "metadata_description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "metadata_favicon" TEXT,
ADD COLUMN     "metadata_image" TEXT,
ADD COLUMN     "metadata_sitename" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "metadata_title" TEXT NOT NULL DEFAULT '';
