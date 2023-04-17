/*
  Warnings:

  - The `theme` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK', 'CUPCAKE', 'BUMBLEBEE', 'EMERALD', 'CORPORATE', 'SYNTHWAVE', 'RETRO', 'CYBERPUNK', 'VALENTINE', 'HALLOWEEN', 'GARDEN', 'FOREST', 'AQUA', 'LOFI', 'PASTEL', 'FANTASY', 'WIREFRAME', 'BLACK', 'LUXURY', 'DRACULA', 'CMYK', 'AUTUMN', 'BUSINESS', 'ACID', 'LEMONADE', 'NIGHT', 'COFFEE', 'WINTER');

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "theme",
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'LIGHT';
