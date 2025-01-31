const mongoose = require('mongoose')

const StoriesSchema =  mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
    },
    content: [{
        type: String,
        default: ""
    }],
    expiration:{
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000
    },
    isViewed:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        default: []
    }]
},{timestamps: true})

StoriesSchema.index({expiration: 1}, {expireAfterSeconds: 0})

module.exports = mongoose.model('Stories', StoriesSchema)