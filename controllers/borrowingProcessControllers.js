const borrowingProcessService = require('../services/borrowingProcessServices');
const fs = require('fs');
const path = require('path');

const createBorrowingProcess = async (req, res) => {
  try {
    const { borrowerId, bookIds, dueDate } = req.validatedData;
    await borrowingProcessService.createBorrowingProcess(borrowerId, bookIds, dueDate);
    res.json({ message: 'borrowing created successfully' });
  } catch (error) {
    console.error('Error checking out book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const { entityId: borrowingProcessId  } = req.validatedData;
    const returnedBook = await borrowingProcessService.returnBook(borrowingProcessId);
    res.json(returnedBook);
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBorrowedBooksByUser = async (req, res) => {
  try {
    const { entityId: borrowerId  } = req.validatedData;
    const borrowedBooks = await borrowingProcessService.getBorrowedBooksByBorrower(borrowerId);
    res.json(borrowedBooks);
  } catch (error) {
    console.error('Error getting borrowed books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOverdueBooksList = async (req, res) => {
  try {
    const overdueBooks = await borrowingProcessService.getOverdueBooks();
    res.json(overdueBooks);
  } catch (error) {
    console.error('Error getting overdue books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBorrowingProcesses = async (req, res) => {
  try {
    const borrowingProcesses = await borrowingProcessService.getAllBorrowingProcesses();
    res.json(borrowingProcesses);
  } catch (error) {
    console.error('Error getting borrowing processes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportBorrowingProcesses = async (req, res) => {
  try {
    const processesLastMonth = await borrowingProcessService.getBorrowingProcessesLastMonth();
     // Export or perform any desired action (e.g., writing to a file)
     const outputPath = path.join(__dirname, 'borrowing_processes.json');
     fs.writeFileSync(outputPath, JSON.stringify(processesLastMonth, null, 2));
    // Export or perform any desired action (e.g., sending as JSON response)
    console.log(`Borrowing processes from the last month exported to: ${outputPath}`);
    res.json({ message: `borrowing created successfully ${outputPath}` });
  } catch (error) {
    console.error('Error exporting borrowing processes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportOverdueBorrows = async (req, res) => {
  try {
    const overdueBorrowsLastMonth = await borrowingProcessService.getOverdueBorrowsLastMonth();
    // Export or perform any desired action (e.g., writing to a file)
    const outputPath = path.join(__dirname, 'overdue_borrows.json');
    fs.writeFileSync(outputPath, JSON.stringify(overdueBorrowsLastMonth, null, 2));
   // Export or perform any desired action (e.g., sending as JSON response)
   res.json({ message: `overdue borrows created successfully ${outputPath}` });
  } catch (error) {
    console.error('Error exporting overdue borrows:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createBorrowingProcess,
  returnBook,
  getBorrowedBooksByUser,
  getOverdueBooksList,
  getBorrowingProcesses,
  exportBorrowingProcesses,
  exportOverdueBorrows
};
