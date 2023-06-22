-- CreateTable
CREATE TABLE "Health" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR(250),
    "color" TEXT NOT NULL DEFAULT 'gray',
    "mood" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);
