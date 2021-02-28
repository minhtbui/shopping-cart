const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(
            `MongoDB Connected: ${connect.connection.host}`.cyan.underline,
        );
    } catch (error) {
        console.log(`Error: ${error.meesage}`.red.underline);
        process.exit(1);
    }
};

module.exports = connectDB;
