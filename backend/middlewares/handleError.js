const {CustomError} = require('../errors')

const handleError = (err, req,res, next) => {
    if(err instanceof CustomError){
        return res.status(401).json({msg:err.message})
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ msg: messages.join(", ") });
    }
    return res.status(401).json({msg: 'Some Internal Issue',error:err.message})

}

module.exports = handleError

