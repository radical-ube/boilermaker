const router = require('express').Router();

// api sub-routes go here

// ^^^^^

// api error handling
router.use((req, res, next) => {
  const error = new Error('API route not found!');
  error.status = 404;
  next(error);
})

module.exports = router
