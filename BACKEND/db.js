const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// const database = process.env.MONGOLAB_URI; 
const database = 'mongodb://localhost:27017/inotes'; 

const connectToMongo = () => {
    mongoose.connect(database, () => {
        console.log("Connected to server sucessfully ");
    });
}

module.exports = connectToMongo;