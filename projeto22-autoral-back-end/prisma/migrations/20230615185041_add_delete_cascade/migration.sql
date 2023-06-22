-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "fk_comments_post";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "fk_comments_user";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "fk_follows_user";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "fk_follows_user_followed";

-- DropForeignKey
ALTER TABLE "Health" DROP CONSTRAINT "fk_reposts_user";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "fk_likes_post";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "fk_likes_user";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "fk_posts_posttype";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "fk_posts_user";

-- DropForeignKey
ALTER TABLE "Reposts" DROP CONSTRAINT "fk_reposts_post";

-- DropForeignKey
ALTER TABLE "Reposts" DROP CONSTRAINT "fk_reposts_user";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "fk_sessions_user";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "fk_comments_post" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "fk_comments_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "fk_follows_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "fk_follows_user_followed" FOREIGN KEY ("userIdIFollow") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "fk_likes_post" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "fk_likes_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "fk_posts_posttype" FOREIGN KEY ("type") REFERENCES "PostType"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "fk_posts_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reposts" ADD CONSTRAINT "fk_reposts_post" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reposts" ADD CONSTRAINT "fk_reposts_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "fk_sessions_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "fk_reposts_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
