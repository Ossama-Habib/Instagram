const {CustomError} = require('../errors')

const handleError = (err, req,res, next) => {
    if(err instanceof CustomError){
        return res.status(401).json({msg:err.message})
    }
    
    return res.status(401).json({msg: 'Some Internal Issue',error:err.message})

}

module.exports = handleError

