const express = require('express');
const { compile } = require('pug');
const router = express.Router()

const auctionStorFunc = require('../storageFunctions/auctionStorageFunctions.js')


router.get('/', (req, res) => {
    if (req.query.change_date_time)
    {
        console.log("Change time request")
        auctionStorFunc.changeDateTime(req.query.dateTime);
        res.redirect(`/auctionSettings`);
        return;
    }
    if (req.query.change_pause)
    {
        console.log("Change pause request")
        auctionStorFunc.changePause(req.query.pause);
        res.redirect(`/auctionSettings`);
        return;          
    }
    if (req.query.change_time_left)
    {
        console.log("Change time left request")
        auctionStorFunc.changeTimeLeft(req.query.timeLeft);
        res.redirect(`/auctionSettings`);
        return;          
    }

    res.render('auctionSettings' , auctionStorFunc.auctionFromFile);
})


module.exports = router;