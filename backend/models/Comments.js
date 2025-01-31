const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
    }
},{timestramps: true})

module.exports = mongoose.model('Comment', CommentSchema)