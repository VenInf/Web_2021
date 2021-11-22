const express = require('express')
const router = express.Router()
const libFunc = require('../libraryFunctions.js')

router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) // if req is empty
        res.render('library', {books: libFunc.booksFromFile.books});
    else
        res.render('books', {books: libFunc.getFilteredBooks(req)});
})

module.exports = router;