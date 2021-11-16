const express = require('express')
const methodOverride = require('method-override')

const app = express()
app.use(methodOverride('_method'))
app.use(express.static(__dirname+ '/public'));
app.set('view engine', 'pug')
app.set('views', 'views')

app.use('/', require('./src/library.js'))
app.use('/books', require('./src/books.js'))

var server = app.listen(8081);

module.exports = app