const mongoose = require("mongoose")


const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/real-estate")
        console.log("connected to mongoDb ");

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb