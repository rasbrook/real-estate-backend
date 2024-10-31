import express from 'express'
import { UpdataUser, Getallusers, GetUserbyid } from '../controller/user.controller.js'
import { Verifyuser } from '../util/verifyUser.js'


const UserRouter=express.Router()

UserRouter.get('/:id', GetUserbyid )

UserRouter.get('/', Getallusers)

UserRouter.put('/update/:id',Verifyuser, UpdataUser )


export default UserRouter