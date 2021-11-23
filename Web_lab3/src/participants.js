const express = require('express');
const { compile } = require('pug');
const router = express.Router()

const fs = require('fs')
const participantsPath = './jsons/participants.json'
const participantsFromFile = JSON.parse(fs.readFileSync(participantsPath))


router.get('/', (req, res) => {
    res.render('participants' , {participants: participantsFromFile.participants});
})

module.exports = router;