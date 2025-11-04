const mongoose = require('mongoose')


const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true
    },
    nseName: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    total: {
        type: Number,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true

    }
}, { timestamps: true })

module.exports = mongoose.model('Stock', stockSchema)