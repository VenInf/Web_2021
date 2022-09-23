const express = require('express');
const { compile } = require('pug');
const router = express.Router()

const partStorFunc = require('../storageFunctions/participantsStorageFunctions.js')


router.get('/', (req, res) => {
    if (req.query.add)
    {
        console.log("Add participant request")
        partStorFunc.addParticipant(req.query);
        res.redirect(`/participants`);
        return;
    }
    if (req.query.delete)
    {
        console.log("Delete participant request")
        partStorFunc.deleteParticipant(req.query.name);
        res.redirect(`/participants`);
        return;          
    }
    if (req.query.change_balance)
    {
        console.log("Changing participant balance")
        partStorFunc.changeParticipantBalance(req.query.name, req.query.balance);
        res.redirect(`/participants`);
        return;          
    }
    res.render('participants' , partStorFunc.participantsFromFile);
})


module.exports = router;