/*
  Warnings:

  - Made the column `comment` on table `Comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "comment" SET NOT NULL;
