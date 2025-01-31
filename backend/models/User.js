const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth" //Changed
    },
    bio:{
        type: String,
        default: ''
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: []
    }],
    followings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: []
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
    }]
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)