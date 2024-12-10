-- CreateTable
CREATE TABLE "KinoTable" (
    "id" TEXT NOT NULL,
    "alternative_film_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "film_name" TEXT NOT NULL,

    CONSTRAINT "KinoTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alternative_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "was_born" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "kinoTableId" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTable" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_follow" BOOLEAN NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokensTable" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TokensTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KinoTable_alternative_film_name_key" ON "KinoTable"("alternative_film_name");

-- CreateIndex
CREATE UNIQUE INDEX "KinoTable_description_key" ON "KinoTable"("description");

-- CreateIndex
CREATE UNIQUE INDEX "KinoTable_film_name_key" ON "KinoTable"("film_name");

-- CreateIndex
CREATE UNIQUE INDEX "UserTable_email_key" ON "UserTable"("email");

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_kinoTableId_fkey" FOREIGN KEY ("kinoTableId") REFERENCES "KinoTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokensTable" ADD CONSTRAINT "TokensTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
