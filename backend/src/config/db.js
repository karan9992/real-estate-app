const mongoose = require("mongoose")


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongoDb ");

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb