const mongoose = require("mongoose")


const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/tradeX")
        console.log("connected to mongoDb ");

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb