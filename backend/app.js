const app = require('express')()
require('dotenv').config();

app.use(require('express').json());
app.use(require('cors')())
app.use(require('morgan')('dev'))
app.use('/', require('./routes/public') )








module.exports = app