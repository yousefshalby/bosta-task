const bookService = require('../services/bookServices');

const createBook = async (req, res) => {
  const { title, author, ISBN, quantity, shelfLocation } = req.body;
  await bookService.createBook(title, author, ISBN, quantity, shelfLocation);
  res.json({ message: "Book Created Successfully" });
};

const getAllBooks = async (req, res) => {
  let books = await bookService.getAllBooks(req);
  res.json(books);
};

const updateBook = async (req, res) => {
  try {
    const { entityId: bookId  } = req.validatedData;
    const newData = req.body;
    const updatedBook = await bookService.updateBook(bookId, newData);
    res.json(updatedBook);
} catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

const deleteBook = async (req, res) => {
  try {
    // Access validated data from the request object
    const { entityId: bookId } = req.validatedData;

    await bookService.deleteBook(bookId);
    res.json({ message: `Book with ID ${bookId} deleted successfully` });
} catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBook, getAllBooks, updateBook, deleteBook };
