-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- RenameForeignKey
ALTER TABLE "Health" RENAME CONSTRAINT "fk_reposts_user" TO "fk_health_user";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "fk_chat_user_from" FOREIGN KEY ("fromId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "fk_chat_user_to" FOREIGN KEY ("toId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
