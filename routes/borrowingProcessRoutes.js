const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowingProcessControllers');


// Routes for borrowing process
router.post('/borrow', borrowerController.createBorrowingProcess);
router.put('/return/:id', borrowerController.returnBook);
router.get('/borrowed/:id', borrowerController.getBorrowedBooksByUser);
router.get('/overdue', borrowerController.getOverdueBooksList);
router.get('/all-processes', borrowerController.getBorrowingProcesses);

module.exports = router;
