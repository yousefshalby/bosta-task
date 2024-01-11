const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handle404 = (req, res, next) => {
    res.status(404).json({ error: 'Not Found', message: 'The requested endpoint does not exist' });
  };
  

  const validateEntityExistence = (entityType) => async (req, res, next) => {
    const entityId = parseInt(req.params.id);
  
    // Validate entity existence
    const entityExists = await prisma[entityType].findUnique({
      where: { id: entityId },
    });
  
    if (!entityExists) {
      return res.status(404).json({ error: 'Not Found', message: `${entityType} not found` });
    }
  
    // Attach validated data to request object for later use
    req.validatedData = {
      entityId,
    };
  
    // Continue to the update or delete process
    next();
  };
  

  const validateBorrowerAndBooks = async (req, res, next) => {
    const { borrowerId, bookIds, dueDate } = req.body;
  
    // Validate borrower existence
    const borrowerExists = await prisma.borrowers.findUnique({
      where: { id: borrowerId },
    });

    if (!borrowerExists) {
      return res.status(404).json({ error: 'Not Found', message: 'Borrower not found' });
    }
  
    // Validate book existence for each book ID
    const invalidBookIds = await prisma.book.findMany({
      where: { id: { in: bookIds } },
    });
  
    if (invalidBookIds.length !== bookIds.length) {
      return res.status(404).json({ error: 'Not Found', message: 'One or more books not found' });
    }
  
    // Attach validated data to request object for later use
    req.validatedData = {
      borrowerId,
      bookIds,
      dueDate,
    };
  
    // Continue to the checkout process
    next();
  };
  
// Middleware for basic authentication
const basicAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Decode the base64-encoded credentials
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Check if the credentials are valid (replace this with your authentication logic)
  if (username === 'user1' && password === 'password1') {
    next(); // Continue to the next middleware or route handler
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


  module.exports = {
    validateEntityExistence,
    handle404,
    validateBorrowerAndBooks,
    basicAuthMiddleware
  };