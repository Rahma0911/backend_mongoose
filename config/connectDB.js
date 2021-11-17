const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Data base is connected.");
    } catch (error) {
        console.log("Data base is not connected.", error);
    }
};
module.exports = connectDB;
