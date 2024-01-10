const borrowingProcessService = require('../services/borrowingProcessServices');

const createBorrowingProcess = async (req, res) => {
  try {
    const { borrowerId, bookIds, dueDate } = req.body;
    await borrowingProcessService.createBorrowingProcess(borrowerId, bookIds, dueDate);
    res.json({ message: 'borrowing created successfully' });
  } catch (error) {
    console.error('Error checking out book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const borrowingProcessId = parseInt(req.params.id);
    const returnedBook = await borrowingProcessService.returnBook(borrowingProcessId);
    res.json(returnedBook);
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBorrowedBooksByUser = async (req, res) => {
  try {
    const borrowerId = parseInt(req.params.id);
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

module.exports = {
  createBorrowingProcess,
  returnBook,
  getBorrowedBooksByUser,
  getOverdueBooksList,
  getBorrowingProcesses
};
