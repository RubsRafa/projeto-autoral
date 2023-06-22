/*
  Warnings:

  - You are about to drop the column `isResposted` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "isResposted",
ADD COLUMN     "isReposted" BOOLEAN NOT NULL DEFAULT false;
