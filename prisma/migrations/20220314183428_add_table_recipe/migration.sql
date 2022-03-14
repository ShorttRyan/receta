-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUsername" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "timeToComplete" INTEGER NOT NULL,
    "ingredients" JSONB[],
    "steps" TEXT[],
    "notes" TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
