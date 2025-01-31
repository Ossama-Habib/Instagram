const Auth = require('../models/Auth')
const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const register = async (req, res) => {
    const {email} = req.body

    const user = await Auth.findOne({email})
    
    const auth = await Auth.create(req.body)        
    return res.status(200).json(auth)
    
}

const login = async (req, res) => {
    const {email, password} = req.body

        if(!email || !password){
           throw new BadRequestError('Please Provide Correct Credentials')
        }
        const user = await Auth.findOne({email})

        if(!user){
           throw new BadRequestError('User Does Not Exist Pleas Register')
        }
        
        const verifyPass = await user.comparePass(password)
        if(!verifyPass){
            return res.status(400).json({msg: 'Please Provide correct Password'})
        }
        const userInfo = {id: user._id, userName: user.userName, email: user.email}
        const token = jwt.sign(userInfo, process.env.JWT_TOKEN)
        res.cookie('usertoken', token,{
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(userInfo)
}

module.exports = {register, login}