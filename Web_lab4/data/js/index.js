const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

var gulp = require(__dirname + '/../../gulpfile.js');
gulp.build(gulp.less)
gulp.build(gulp.babel)

const app = express()
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+ '/../images'));
app.use('/public', express.static(__dirname+ '/../../public'));
app.use('/jquery', express.static(__dirname + '/../../node_modules/jquery/dist/'));
app.use('/jquery-ui', express.static(__dirname + '/../../node_modules/jquery-ui/dist/'))
app.set('view engine', 'pug')
app.set('views', __dirname + '/../views')

app.use('/', require(__dirname + '/routers/authorization.js'))
app.use('/mainPage', require(__dirname + '/routers/mainPage.js'))
app.use('/paintings', require(__dirname + '/routers/paintings.js'))
app.use('/participants', require(__dirname + '/routers/participants.js'))
app.use('/auctionSettings', require(__dirname + '/routers/auctionSettings.js'))
app.use('/auction', require(__dirname + '/routers/auction.js'))

const http = require('http');
const server = http.createServer(app);

server.listen(8080);

const auctionHandler = require("./auctionHandler")
auctionHandler.setupIO(server)

module.exports = io
module.exports = app