
class CustomError extends Error{
    constructor(message){
        super(message)
        // this.statusCode = statusCode

    }
} 

module.exports = CustomError