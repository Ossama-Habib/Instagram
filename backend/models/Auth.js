const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const User = require('./User')

const AuthSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, 'Please Provide Username'],
        trime: true
    },
    email:{
        type: String,
        required: [true, 'Please Provide Email'],
        validate:{
            validator: validator.isEmail,
            message:"Please Provide correct Email"
        },
        unique: true
    },
    password:{
        type: String,
        minlength: 6,
        maxlength: 15,
        required: [true, 'Please Provide Password']
    },  
    profileImg:{
        type: String,
        default:'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'
    },
},{timestamps: true})

AuthSchema.pre('save',async function () {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

AuthSchema.methods.comparePass = async function(userTypePass){
    return await bcryptjs.compare(userTypePass, this.password)
}

AuthSchema.post('save',async function(data){
    const user = await User.create({
        user: data._id
    })
})
module.exports = mongoose.model('Auth',AuthSchema)