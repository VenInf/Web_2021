const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('mainPage',
            {sessionStorageData:
                {
                    sessionStorageName: req.query.name,
                    sessionStorageID: req.query.id
                }
            }
        );
})

module.exports = router;