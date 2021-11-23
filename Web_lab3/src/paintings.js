const express = require('express');
const { compile } = require('pug');
const router = express.Router()
const paintStorFunc = require('../paintingStorageFunctions.js')

router.get('/', (req, res) => {
    if (req.query.id)
    {
        const reqPainting = paintStorFunc.getPainting(parseInt(req.query.id));
        res.render('painting', {painting: reqPainting});
    }
    else
    {
        res.render('paintings', paintStorFunc.paintingsFromFile)
    }
})

module.exports = router;