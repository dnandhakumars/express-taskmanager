const { CustomAPIError } = require("../utils/custom-error")


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message:err.message})    
    }
    return res.status(500).json({message:"Something went wrong"})
}

module.exports = errorHandlerMiddleware