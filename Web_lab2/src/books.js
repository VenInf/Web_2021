const express = require('express');
const { compile } = require('pug');
const router = express.Router()
const libFunc = require('../libraryFunctions.js')

router.get('/', (req, res) => {
    if (req.query.id)
    {
        const reqBook = libFunc.getBook(parseInt(req.query.id));
        res.render('book', {book: reqBook});
    }
    else
    {
        res.redirect('/')
    }
})

router.put('/', (req, res) => {
    if (req.body.title !== undefined)
    {
      libFunc.addBook(req);
    }
    res.redirect('/books');
  });
  
router.post('/', (req, res) => {
    if (req.body.isEdit === true)
    {
        libFunc.editBook(req.body.id, req);
    } 
    else
    {
        libFunc.takeReturnBook(req.body.id, req.body.reader);
    }
    res.redirect(`/books/?id=${req.body.id}`);
});

router.delete('/', (req, res) => {
    if (req.body.id !== undefined)
    {
        libFunc.removeBook(req.body.id, req.book.reader);
    }
    res.redirect('/books');
});

module.exports = router;