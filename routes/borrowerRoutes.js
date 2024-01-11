const express = require('express');
const router = express.Router();
const createBorrowerLimiter = require('../rateLimiter/borrowersLimiter');
const borrowerController = require('../controllers/borrowerControllers');
const middleware = require('../middleware');

// Routes for borrowers
router.post('/borrowers', createBorrowerLimiter, borrowerController.createBorrower);
router.get('/borrowers', borrowerController.getBorrowers);
router.put('/borrowers/:id', middleware.validateEntityExistence("borrowers"),borrowerController.updateBorrower);
router.delete('/borrowers/:id', middleware.validateEntityExistence("borrowers"), borrowerController.deleteBorrower);

module.exports = router;
