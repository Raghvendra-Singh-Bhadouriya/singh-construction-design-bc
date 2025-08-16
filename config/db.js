require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB Connected Successfully`);
    } catch (error) {
        console.log(`❌ MongoDB is not Connected ${error.message}`);
    }
}

module.exports = connectDB;