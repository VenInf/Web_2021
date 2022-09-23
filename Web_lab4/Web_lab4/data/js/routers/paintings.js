const express = require('express');
const { compile } = require('pug');
const router = express.Router()
const paintStorFunc = require('../storageFunctions/paintingStorageFunctions.js')

router.get('/', (req, res) => {
    if (req.query.id && req.query.edit == undefined)
    {
        console.log("Getting painting page request")
        const reqPainting = paintStorFunc.getPainting(parseInt(req.query.id));
        res.render('painting', {painting: reqPainting});
    }
    else
    {
        if (req.query.edit)
        {
            console.log("Getting painting edition request")
            paintStorFunc.editPainting(req.query);
            res.redirect(`/paintings/?id=${req.query.id}`);
        }
        else
        {
            console.log("Redirecting to paintings page")
            res.render('paintings', paintStorFunc.paintingsFromFile)
        }
    }
})

router.post('/', (req, res) => {
    if (req.body.activate == 'true')
    {
        console.log("Getting painting activation request")
        paintStorFunc.activate(req.body.id);
    }
    if (req.body.deactivate == 'true')
    {
        console.log("Getting painting deactivation request")
        paintStorFunc.deactivate(req.body.id);
    }
    if (req.body.activateAll == 'true')
    {
        console.log("Getting all paintings activation request")
        paintStorFunc.activateAll();
    }
});

module.exports = router;