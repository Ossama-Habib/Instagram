const jwt = require('jsonwebtoken')
const {AuthenticatedError, BadRequestError} = require('../errors')

const protect = (req, res, next) => {
    const cookie = req.cookies.usertoken
    if(!cookie){
        throw new AuthenticatedError('Token is not present!!')
    }
    try {
        const token = jwt.verify(cookie,process.env.JWT_TOKEN)
        req.user = token
        next()
    } catch (error) {
      throw new Error()  
    }
}

const authorizePermission = (postId) => {
    return (req, res, next) => {
        if(req.user.id !== postId){
            throw new BadRequestError("You cannot perform this task")
        }
        next()
    }
}

module.exports = {protect,authorizePermission}