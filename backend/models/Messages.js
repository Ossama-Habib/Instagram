const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "we dont have sender ID"]
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "we dont have recevier ID"]
    },
    message: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('messages', MessagesSchema)

