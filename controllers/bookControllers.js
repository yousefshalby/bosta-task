// controllers/bookController.js
const bookService = require('../services/bookServices');

const createBook = (req, res) => {
  const { title, author, ISBN, quantity, shelfLocation } = req.body;
  bookService.createBook(title, author, ISBN, quantity, shelfLocation);
  res.send('Book created successfully.');
};

const getAllBooks = async (req, res) => {
  let books = await bookService.getAllBooks(req);
  res.json(books);
};

const updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const newData = req.body;
  bookService.updateBook(bookId, newData);
  res.send(`Book with ID ${bookId} updated successfully.`);
};

const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  bookService.deleteBook(bookId);
  res.send(`Book with ID ${bookId} deleted successfully.`);
};

module.exports = { createBook, getAllBooks, updateBook, deleteBook };
