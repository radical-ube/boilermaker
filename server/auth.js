const router = require('express').Router()
const { User } = require('./db/models/User')
module.exports = router

router.use('/google', require('./oauth'))

// auth routes
router.put('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email,
        password
      }
    })
    if (user) {
      req.login(user, err => {
        if (err) next(err);
        else {
          req.session.userId = user.id;
          res.json(user)
        }
      })
    }
    else {
      res.sendStatus(401).send('invalid user or password')
    }
  }
  catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    if (user) {
      req.login(user, err => {
        if (err) next(err);
        else {
          req.session.userId = user.id;
          res.json(user)
        }
      })
    }
    else {
      res.sendStatus(401).send('invalid user or password')
    }
  }
  catch (error) {
    next(error)
  }
})

router.delete('/logout', (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.sendStatus(204);
  }
  catch (error) {
    next(error)
  }
})

router.get('/me', (req, res, next) => {
  res.json(req.user);
})
