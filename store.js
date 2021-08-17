const {Book, User} = require('./models');
const stor = {
    books: [],
    users: []
};

stor.users.push(new User("test@mail.ru", 1));

[1, 2, 3, 4, 5].map(el => {
    const newBook = new Book(
        `book ${el}`,           //title
        `desc book ${el}`,      //description
        `authors book ${el}`,   //authors
        `favorite book ${el}`,  //favorite
        `fileCover book ${el}`, //fileCover
        `fileName book ${el}`,   //fileName
        ''                      //fileBook
    );
    stor.books.push(newBook);
});

module.exports = stor;



