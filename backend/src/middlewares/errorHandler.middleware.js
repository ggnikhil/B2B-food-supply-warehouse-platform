import { config } from "../config/config.js";

export async function errorHandler(err,req,res,next) {
    const response = {
        success:false,
        message : err.messsage
    }

    if(config.NODE_ENV = "Development"){
        response.stack = err.stack
    }

    res.status(err.statusCode || err.status || 500).json(response);
}