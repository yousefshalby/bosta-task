const rateLimit = require('express-rate-limit');


// Rate limit the borrower creation endpoint
const createBookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per 15 minutes
    message: 'Too many books creation attempts. Please try again later.',
  });


module.exports = createBookLimiter;