-- CreateIndex
CREATE INDEX "Chat_fromId_toId_idx" ON "Chat"("fromId", "toId");

-- CreateIndex
CREATE INDEX "Follows_userId_idx" ON "Follows"("userId");

-- CreateIndex
CREATE INDEX "Posts_userId_idx" ON "Posts"("userId");

-- CreateIndex
CREATE INDEX "Users_name_idx" ON "Users"("name");
