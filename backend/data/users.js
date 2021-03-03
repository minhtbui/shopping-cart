const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin',
        email: 'admin@domain.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'User1',
        email: 'user1@domain.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'User2',
        email: 'user2@domain.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

module.exports = users;
