-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "portions" INTEGER NOT NULL DEFAULT 1;
