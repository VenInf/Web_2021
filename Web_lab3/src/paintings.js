const express = require('express');
const { compile } = require('pug');
const router = express.Router()
const libFunc = require('../paintingStorageFunctions.js')

router.get('/', (req, res) => {
    if (req.query.id)
    {
        const reqPainting = libFunc.getPainting(parseInt(req.query.id));
        res.render('painting', {painting: reqPainting});
    }
    else
    {
        res.redirect('/')
    }
})

module.exports = router;