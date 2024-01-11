const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBorrowingProcess = async (borrowerId, bookIds, dueDate) => {
  const borrowingProcess = await prisma.borrowingProcess.create({
    data: {
      borrowersId: borrowerId,
      dueDate: dueDate,
      books: {
        connect: bookIds.map((bookId) => ({ id: bookId })),
      },
    },
  });

  return borrowingProcess;
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

const getBorrowingProcessesLastMonth = async () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return prisma.borrowingProcess.findMany({
    where: {
      borrowDate: {
        gte: lastMonth,
      },
    },
    include: {
      books: true,
      borrower: true,
    },
  });
};

const getAllBorrowingProcesses = async () => {
  return prisma.borrowingProcess.findMany({
    include: {
      books: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const getOverdueBorrowsLastMonth = async () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return prisma.borrowingProcess.findMany({
    where: {
      dueDate: {
        lt: new Date(),
        gte: lastMonth,
      },
      returned: false,
    },
    include: {
      books: true,
      borrower: true,
    },
  });
};

module.exports = {
  createBorrowingProcess,
  returnBook,
  getBorrowedBooksByBorrower,
  getOverdueBooks,
  getAllBorrowingProcesses,
  getBorrowingProcessesLastMonth,
  getOverdueBorrowsLastMonth
};

