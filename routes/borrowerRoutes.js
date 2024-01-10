const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerControllers');

// Routes for borrowers
router.post('/borrowers', borrowerController.createBorrower);
router.get('/borrowers', borrowerController.getBorrowers);
router.put('/borrowers/:id', borrowerController.updateBorrower);
router.delete('/borrowers/:id', borrowerController.deleteBorrower);

module.exports = router;
