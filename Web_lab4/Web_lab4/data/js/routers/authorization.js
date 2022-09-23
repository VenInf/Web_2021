const express = require('express');
const { compile } = require('pug');
const router = express.Router()

const partStorFunc = require('../storageFunctions/participantsStorageFunctions.js')

router.get('/', (req, res) => {
    if (req.query.autorisation == 'true')
    {
        if (partStorFunc.isThereParticipant(req.query.name))
        {
            res.redirect(`/mainPage/?name=${req.query.name}&id=${partStorFunc.getParticipantIDByName(req.query.name)}`)
        }
        else
        {
            res.render('authorization');
        }
    }
    else
    {
        res.render('authorization');
    }
})

module.exports = router;