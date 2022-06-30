const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://HPPATEL:aBkzs1Utr1lxi80C@inotes.3x5tp.mongodb.net/test";   

const mongoURI = 'mongodb://localhost:27017/inotes';

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to server sucessfully ");
    });
}

module.exports = connectToMongo;