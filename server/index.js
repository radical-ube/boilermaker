const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path')

const {db} = require('../server/db/')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
const dbStore = new SequelizeStore({ db: db })
dbStore.sync()

const passport = require('passport')

const app = express()

// logging middleware
app.use(volleyball)

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// session middleware
app.use(session({
  secret: (process.env.SESSION_SECRET || 'a not secure secret'),
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

// authentication router
app.use('/auth', require('./auth'))

// api routes
app.use('/api', require('./api'))

// send index.html for any non-api requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// 400 errors
app.use((req, res) => {
  res.status(404).send('Error 404 - page not found')
})

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Error 500 - internal server error')
})

module.exports = app
