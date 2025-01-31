const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages"
    }]
},{timestamps: true})

module.exports = mongoose.model('Conversation', ConversationSchema)

