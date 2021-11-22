const fs = require('fs')
const booksPath = './jsons/books.json'
const booksFromFile = JSON.parse(fs.readFileSync(booksPath))

function getBook(id)
{
    let chosenBook = null;
    booksFromFile.books.forEach(book =>{
        if (book.id === id)
            chosenBook = book;
        });
    return chosenBook;
}

function maxFreeID()
{
    let id = 1;
    booksFromFile.books.forEach(book => {
        if (id == book.id)
            id += 1;
    });
    return id;    
}

function addBook(req)
{
    let id = maxFreeID();
    booksFromFile.books.push(
        {
        id,
        title: req.body.title,
        author: req.body.author,
        avaliable: 'true',
        returnDate: '',
        reader: '',
        publicDate: req.body.publicDate
    });
}

function removeBook (id)
{
    for (const key in booksFromFile.books) {
        if (booksFromFile.books[key].id === parseInt(id))
        {
            booksFromFile.books.splice(key, 1);
        }
    }
}

function editBook (id, req)
{
    booksFromFile.books.forEach(book => {
        if (book.id === parseInt(id))
        {
            if (req.body.title !== undefined)
                book.title = req.body.title;
            if (req.body.author !== undefined)
                book.author = req.body.author;
            if (req.body.publicDate !== undefined)
                book.publicDate = req.body.publicDate;
        }
    });
}

function takeReturnBook (id, reader)
{
    booksFromFile.books.forEach(book => {
        if (book.id === parseInt(id))
        {
            if (book.avaliable === 'true')
            {
                book.avaliable = 'false';
                book.reader = reader;
                treeDays = 3 * 24 * 60 * 60 * 1000
                book.returnDate = new Date(new Date().getTime() + treeDays).toISOString();
            }
            else
            {
                book.avaliable = 'true';
                book.reader = '';
                book.returnDate = '';
            }
        }
    });
}

function getFilteredBooks (req)
{
    return booksFromFile.books.map(book => {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            publicDate: book.publicDate,
            avaliable: book.avaliable,
            reader: book.reader,
            returnDate: book.returnDate
        }
    }).filter(book => {
        if (req === null || req === undefined)
            return true;
        if (req.query.avaliable !== '' && !book.avaliable.startsWith(req.query.avaliable))
            return false;
        return true;
    });
}

module.exports = 
{
    getBook,
    addBook,
    removeBook,
    editBook,
    takeReturnBook,
    getFilteredBooks,
    booksFromFile
}