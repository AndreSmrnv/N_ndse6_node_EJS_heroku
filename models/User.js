const { customAlphabet } = require('nanoid');
const ranid = customAlphabet('1234567890abcdef', 9);

class User {
    constructor(
        mail = "",        
        id = ranid()
    ) {
        this.mail = mail;        
        this.id = id;
    }
}

module.exports = User;
