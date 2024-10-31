import { errorHandel } from "../middleware/error.handler.js";
import jwt from 'jsonwebtoken'

export const Verifyuser=(req, res, next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandel(401, "UnAuthorized", false))
    }

    jwt.verify(token, process.env.JWS_SECRET ,(err, user)=>{
        if(err) return next(errorHandel(403, "Forbidden", false))

            req.user=user
            next()
            

    })

}