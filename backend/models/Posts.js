const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    image:{
        type: String, 
        default:'https://th.bing.com/th/id/OIP.D42NLRdChGemYqMsUTsHmQHaE7?rs=1&pid=ImgDetMain'
    },
    caption:{
        type: String,
        default: ''
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: []
    }],
},{timestamps: true})

module.exports = mongoose.model('Post', PostSchema)