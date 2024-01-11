const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const borrowingProcessRoutes = require('./routes/borrowingProcessRoutes');
const middleware = require('./middleware');

const app = express()
const port = 3000


// Middleware
app.use(express.json())
app.use(middleware.basicAuthMiddleware)
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1/
app.use('/api/v1/', bookRoutes)
app.use('/api/v1/', borrowerRoutes)
app.use('/api/v1/', borrowingProcessRoutes)

// Handle 404 for unmatched routes
app.use(middleware.handle404);

app.listen(port, () => {
    console.log("Server started on port 3000")
})
