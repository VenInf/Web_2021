const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const app = express()
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+ '/images'));
app.set('view engine', 'pug')
app.set('views', 'views')

app.use('/', require('./src/root.js'))
app.use('/paintings', require('./src/paintings.js'))

var server = app.listen(8080);

module.exports = app