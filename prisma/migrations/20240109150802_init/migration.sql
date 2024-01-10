-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "shelfLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrowers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowingProcess" (
    "id" SERIAL NOT NULL,
    "borrowed" TIMESTAMP(3) NOT NULL,
    "returnedDate" TIMESTAMP(3),
    "borrowersId" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BorrowingProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToBorrowingProcess" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN_key" ON "Book"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_email_key" ON "Borrowers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowingProcess_borrowersId_key" ON "BorrowingProcess"("borrowersId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBorrowingProcess_AB_unique" ON "_BookToBorrowingProcess"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBorrowingProcess_B_index" ON "_BookToBorrowingProcess"("B");

-- AddForeignKey
ALTER TABLE "BorrowingProcess" ADD CONSTRAINT "BorrowingProcess_borrowersId_fkey" FOREIGN KEY ("borrowersId") REFERENCES "Borrowers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBorrowingProcess" ADD CONSTRAINT "_BookToBorrowingProcess_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBorrowingProcess" ADD CONSTRAINT "_BookToBorrowingProcess_B_fkey" FOREIGN KEY ("B") REFERENCES "BorrowingProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;
