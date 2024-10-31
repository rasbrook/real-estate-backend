import bcryptjs from 'bcryptjs'
import User from '../model/user.model.js'
import { errorHandel } from '../middleware/error.handler.js'
import jwt from 'jsonwebtoken'



export const Getallusers=async(req,res)=>{
    await res.send('this are all the users')
}


export const UpdataUser=async(req,res, next)=>{
    
    if(req.user.id!==req.params.id) return next(errorHandel(401, 'You are Not the correct user'))
    
    
    try {
        const {username, email, password, avator, bio}=req.body
        if(password){
            password=bcryptjs.hashSync(password, 10)
        }


        const updateduser=await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username:username,
                email:email, 
                avator:avator, 
                password:password,
                bio:bio

            }
        }, {new:true})
        updateduser.save()
        const {password:pass, ...rest}=updateduser._doc
        console.log(rest)
        const token = jwt.sign({ id: updateduser._id }, process.env.JWS_SECRET)
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'successfully updated', rest , success:true})
        
    } catch (error) {
        next(errorHandel(401, error))

        
    }
}



export const GetUserbyid=async(req,res)=>{
    await res.send('user created')
}

