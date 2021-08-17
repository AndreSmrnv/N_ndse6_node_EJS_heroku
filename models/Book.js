//const uidGenerator = require('node-random-id');
const { customAlphabet } = require('nanoid');
const ranid = customAlphabet('1234567890abcdef', 9);

class Book {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileName = "",
        fileBook = "",
        id = ranid ()
    ) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.id = id;
    }
}

module.exports = Book;
