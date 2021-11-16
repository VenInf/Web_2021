const express = require('express');
const { compile } = require('pug');
const router = express.Router()
const library = require('../libraryFunctions.js')

router.get('/', (req, res) => {
    if (req.query.id)
    {
        const reqBook = library.getBook(parseInt(req.query.id));
        res.render('book', {book: reqBook});
    }
    else
    {
        res.redirect('/')
    }
})


// REST API
router.put('/', (req, res) => {
    console.log(req.body);
    if (req.body.title !== undefined) {
      library.addBook(req);
    }
    res.redirect('/books');
  });
  
// router.post('/', (req, res) => {
// if (req.body.is_free !== undefined) {
//     console.log('Taking return book ' + req.body.is_free);
//     library.takeReturnBook(req.body.id, req);
// } else {
//     console.log('Editing book');
//     library.editBook(req.body.id, req);
// }
// res.redirect(`/books/?id=${req.body.id}`);
// });

// router.delete('/', (req, res) => {
// if (req.body.id !== undefined) {
//     library.removeBook(req.body.id);
// }
// res.redirect('/books');
// });

module.exports = router;