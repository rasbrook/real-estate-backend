import { Router } from "express";
import { Signin, Sign_Up, Google_Sign_up, Google_Signin } from "../controller/auth.controller.js";


const AuthRouter=Router()

AuthRouter.post('/sign-up', Sign_Up)
AuthRouter.post('/sign-in', Signin)
AuthRouter.post('/google-signup', Google_Sign_up)
AuthRouter.post('/google-signin', Google_Signin)




export default AuthRouter