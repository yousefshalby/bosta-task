const borrowerService = require('../services/borrowerServices');
const validator = require('validator');

// Controller function to create a new borrower
const createBorrower = async (req, res) => {
  try {
    const { name, email } = req.body;
    // Validate email using validator
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    const newBorrower = await borrowerService.createBorrower({ name, email });
    res.json(newBorrower);
  } catch (error) {
    console.error('Error creating borrower:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a list of all borrowers
const getBorrowers = async (req, res) => {
  try {
    const borrowers = await borrowerService.getBorrowers();
    if (borrowers.length > 0) {
      res.json(borrowers);
    } else {
      res.status(404).json({ message: 'No borrowers found' });
    }
  } catch (error) {
    console.error('Error getting borrowers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a borrower by ID
const updateBorrower = async (req, res) => {
  try {
    const { entityId: borrowerId  } = req.validatedData;
    const { name, email } = req.body;
    const updatedBorrower = await borrowerService.updateBorrower(borrowerId, { name, email });
    res.json(updatedBorrower);
  } catch (error) {
    console.error('Error updating borrower:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a borrower by ID
const deleteBorrower = async (req, res) => {
  try {
    const { entityId: borrowerId } = req.validatedData;
    await borrowerService.deleteBorrower(borrowerId);
    res.json({ message: 'Borrower deleted successfully' });
  } catch (error) {
    console.error('Error deleting borrower:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBorrower,
  getBorrowers,
  updateBorrower,
  deleteBorrower,
};
