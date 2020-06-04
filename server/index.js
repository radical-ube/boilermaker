const express = require('./node_modules/express');
const volleyball = require('./node_modules/volleyball');
const bodyParser = require('./node_modules/body-parser');

const app = express();

// logging middleware
app.use(volleyball)

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// api routes
app.use('/api', require('./api'))

