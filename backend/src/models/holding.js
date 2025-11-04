const mongoose = require('mongoose')


const holdingSchema = new mongoose.Schema({

    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
         required: true
    },
    nseName: {
        type: String
       
    },
    stockName: {
        type: String,
         required: true
    },
    qty: {
        type: Number,
        required: true
    },
    avgBuyPrice: {
        type: Number,
        required: true
    },
    totalInvestment: {
        type: Number,   // qty * avgBuyPrice
        required: true
    }

    // currentValue: {
    //     type: Number
    // },                 // qty * currentPrice
    // profitLoss: {
    //     type: Number
    // }
}, { timestamps: true })

module.exports=  mongoose.model("Holding",holdingSchema)