const express = require('express');
const router = express.Router();
const createBookLimiter = require('../rateLimiter/booksLimiter');
const bookController = require('../controllers/bookControllers');
const middleware = require('../middleware');

router.post('/books', createBookLimiter, bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.put('/books/:id', middleware.validateEntityExistence("book"), bookController.updateBook);
router.delete('/books/:id', middleware.validateEntityExistence("book"), bookController.deleteBook);

module.exports = router;
