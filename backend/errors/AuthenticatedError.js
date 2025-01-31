const CustomError = require('./CustomError')

class AuthenticatedError extends CustomError{
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}

module.exports = AuthenticatedError