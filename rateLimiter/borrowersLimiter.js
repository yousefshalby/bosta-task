const rateLimit = require('express-rate-limit');

// Rate limit the borrower creation endpoint
const createBorrowerLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 10, // Max 10 requests per 20 minutes
    message: 'Too many borrower creation attempts. Please try again later.',
  });


module.exports = createBorrowerLimiter;
