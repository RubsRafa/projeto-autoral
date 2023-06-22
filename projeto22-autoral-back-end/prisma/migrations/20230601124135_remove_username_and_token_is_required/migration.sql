/*
  Warnings:

  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - Made the column `token` on table `Sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Sessions" ALTER COLUMN "token" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username";
