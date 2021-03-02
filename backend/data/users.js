const bcrypt = require('bcrypt');

const users = [
    {
        name: 'Admin',
        emailL: 'admin@domain.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'User1',
        emailL: 'user1@domain.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'User2',
        emailL: 'user2@domain.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

module.exports = users;
