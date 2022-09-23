const fs = require('fs')
const path = require("path");
const auctionPath = '../../jsons/auction.json'
const auctionFromFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, auctionPath)))

function changeDateTime(dateTime)
{
    auctionFromFile.auction.dateTime = dateTime;
}

function changePause(pause)
{
    auctionFromFile.auction.pause = pause;
}

function changeTimeLeft(timeLeft)
{
    auctionFromFile.auction.timeLeft = timeLeft;
}

module.exports = 
{
    changeDateTime,
    changePause,
    changeTimeLeft,
    auctionFromFile
}
