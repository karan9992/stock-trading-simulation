const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName :{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    },
    balance :{
        type: Number,
        default: 1000000
    }
},{timestamps: true})

module.exports = mongoose.model('User',userSchema)