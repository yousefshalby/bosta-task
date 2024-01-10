const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBorrowingProcess = async (borrowerId, bookIds, dueDate) => {
  const createBorrowingProcessPromises = bookIds.map((bookId) => {
    return prisma.borrowingProcess.create({
      data: {
        borrowersId: borrowerId,
        books: { connect: { id: bookId } },
        dueDate: dueDate,
      },
    });
  });

  return Promise.all(createBorrowingProcessPromises);
};

const returnBook = async (borrowingProcessId) => {
  return prisma.borrowingProcess.update({
    where: { id: borrowingProcessId },
    data: {
      returned: true,
    },
  });
};

const getBorrowedBooksByBorrower = async (borrowerId) => {
  return prisma.borrowingProcess.findMany({
    where: {
      borrowersId: borrowerId,
      returned: false,
    },
    include: {
      books: true,
    },
  });
};

const getOverdueBooks = async () => {
  const currentDate = new Date();
  return prisma.borrowingProcess.findMany({
    where: {
      dueDate: {
        lt: currentDate,
      },
      returned: false,
    },
    include: {
      books: true,
    },
  });
};


const getAllBorrowingProcesses = async () => {
  return prisma.borrowingProcess.findMany({
    include: {
      books: true,
    },
  });
};

module.exports = {
  createBorrowingProcess,
  returnBook,
  getBorrowedBooksByBorrower,
  getOverdueBooks,
  getAllBorrowingProcesses,
};

