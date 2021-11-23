const express = require('express');
const router = express.Router()
const paintStorFunc = require('../paintingStorageFunctions.js')

router.get('/', (req, res) => {
    res.render('paintings' , {paintings: paintStorFunc.paintingsFromFile.paintings});
})

module.exports = router;