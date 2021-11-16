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
        else
            break;
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

module.exports = 
{
    getBook,
    addBook,
    booksFromFile
}