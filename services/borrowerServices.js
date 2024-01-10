const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service function to create a new borrower
const createBorrower = async ({ name, email }) => {

  return await prisma.borrowers.create({
    data: {
      name,
      email,
    },
  });
};

// Service function to get a list of all borrowers
const getBorrowers = async () => {
  return await prisma.borrowers.findMany();
};

// Service function to update a borrower by ID
const updateBorrower = async (borrowerId, { name, email,  }) => {
  return await prisma.borrowers.update({
    where: { id: borrowerId },
    data: {
      name,
      email,
    },
  });
};

// Service function to delete a borrower by ID
const deleteBorrower = async (borrowerId) => {
  return await prisma.borrowers.delete({
    where: { id: borrowerId },
  });
};

module.exports = {
  createBorrower,
  getBorrowers,
  updateBorrower,
  deleteBorrower,
};
