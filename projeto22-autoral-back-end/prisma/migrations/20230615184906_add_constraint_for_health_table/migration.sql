-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "fk_reposts_user" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
