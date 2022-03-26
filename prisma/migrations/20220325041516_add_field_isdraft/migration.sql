/*
  Warnings:

  - You are about to drop the column `private` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.
  - The `notes` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `isDraft` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPrivate` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "private",
DROP COLUMN "steps",
ADD COLUMN     "instructions" JSONB[],
ADD COLUMN     "isDraft" BOOLEAN NOT NULL,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
DROP COLUMN "notes",
ADD COLUMN     "notes" JSONB[];
