-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "publishedAt" BIGINT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "authorFirstName" TEXT NOT NULL,
    "authorLastName" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "timeToComplete" INTEGER NOT NULL,
    "ingredients" JSONB[],
    "steps" TEXT[],
    "notes" TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
