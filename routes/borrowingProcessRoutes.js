const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowingProcessControllers');
const middleware = require('../middleware');


// Routes for borrowing process
router.post('/borrow', middleware.validateBorrowerAndBooks, borrowerController.createBorrowingProcess);
router.put('/return/:id', middleware.validateEntityExistence("borrowingProcess"), borrowerController.returnBook);
router.get('/borrowed/:id', middleware.validateEntityExistence("borrowingProcess"), borrowerController.getBorrowedBooksByUser);
router.get('/overdue', borrowerController.getOverdueBooksList);
router.get('/all-processes', borrowerController.getBorrowingProcesses);  // to return all borrowing processes
router.get('/export-borrowing-processes', borrowerController.exportBorrowingProcesses);
router.get('/export-overdue-borrows', borrowerController.exportOverdueBorrows);

module.exports = router;
