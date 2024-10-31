import { body } from 'express-validator'
import { errorHandel } from '../middleware/error.handler.js'
import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const Sign_Up=async(req,res, next)=>{
    const {body}=req
    const {username, email, password, avator, phone}=body
    
    const hashpassword=bcryptjs.hashSync(password, 10)
    
    
    try {
        const userame=await User.findOne({ username: username })
        const emal = await User.findOne({ email: email })
        
        if(userame&&emal){
            
            return next(errorHandel(400, 'There is an Account with this email address and Username'))
        }


        if(userame){
        
            return next(errorHandel(400, 'Username already taken'))
        }
        if(isNaN(phone)){
            return next(errorHandel(400, 'Invalid phone number'))

        }
        
        
        if(emal){
            return next(errorHandel(400, 'There is an Account with this email address'))
        }

            
    

        const newuser=User({username, email, password:hashpassword, avator, phone})
        await newuser.save()
        const {password:pass, ...rest}=newuser._doc
        console.log(rest)
        const token = jwt.sign({ id: newuser._id }, process.env.JWS_SECRET)
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'Sign-in Succesfull', rest , success:true})
        
    } catch (error) {
        next(error)
        
        
        
    
    
    

}}

export async function Signin(req, res, next) {
    const { body } = req
    const { email, password, avator } = body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return next(errorHandel(400, 'User Not found', false))
        }

        const passwordvalid = bcryptjs.compareSync(password, user.password)
        if (!passwordvalid) {
            return next(errorHandel(401, "Incorrect Email or Password", false))

        }
        console.log(body)
        const {password:pass, ...rest}=user._doc
        console.log(rest)
        const token = jwt.sign({ id: user._id }, process.env.JWS_SECRET)
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'Sign-in Succesfull', rest , success:true})


    }
    catch (error) {
        next(error)


    }



}

export const Google_Sign_up=async(req,res, next)=>{
    const {body}=req
    let {username, email, image}=body
    const password=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4)
    username=username.split(' ').join('').toLowerCase() +Math.random().toString(36).slice(-3)

   

    
    const hashpassword=bcryptjs.hashSync(password, 10)
    
    try {
        const userame=await User.findOne({ username: username })
        const emal = await User.findOne({ email: email })
        
        if(userame&&emal){
            
            return next(errorHandel(400, 'There is an Account with this email address and Username'))
        }


        if(userame){
        
            return next(errorHandel(400, 'Username already taken'))
        }
        
        
        if(emal){
            return next(errorHandel(400, 'There is an Account with this email address'))
        }

           
    

        const newuser=User({username, email, password:hashpassword, avator:image})
        await newuser.save()
        res.status(201).json(newuser)
        console.log(newuser)
    } catch (error) {
        next(error)
           

}}




export async function Google_Signin(req, res, next) {
    const { body } = req
    const { email , password} = body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return next(errorHandel(400, 'User Not found', false))
        }

        const passwordvalid = bcryptjs.compareSync(password, user.password)
        if (!passwordvalid) {
            return next(errorHandel(401, "Incorrect Email or Password", false))

        }
        console.log(body)
        const {password:pass, ...rest}=user._doc
        const token = jwt.sign({ id: user._id }, process.env.JWS_SECRET)
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'Sign-in Succesfull', rest , success:true})


    }
    catch (error) {
        next(error)


    }



}



