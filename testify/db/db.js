const mongoose = require("mongoose");

const connectDB = async() =>{
    mongoose.connect( process.env.MONGO_URI ||'mongodb://localhost:27017/testify' )
    console.log('Connected to MongoDB')
}

module.exports = connectDB;