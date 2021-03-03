const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // remove DATA in mongDB
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        // insert DATA from local data
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data is inserted to Database'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
};

const destroyedData = async () => {
    try {
        // remove DATA in mongDB
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data is destroyed from Database'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
};

// package call in terminal
process.argv[2] === '-d' ? destroyedData() : importData();
