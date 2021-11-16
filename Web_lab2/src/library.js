const express = require('express')
const router = express.Router()
const library = require('../libraryFunctions.js')

router.get('/', (req, res) => {
    res.render('library', {books: library.booksFromFile.books});
})

module.exports = router;