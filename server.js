import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'
import { errorHandel, Handlerror } from './middleware/error.handler.js'
import cookieParser from 'cookie-parser'


const app=express()
dotenv.config()
mongoose.set("strictQuery", false)



// .env
const database=process.env.MONGODB
const PORT=process.env.PORT


///middlewares 
app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', AuthRouter)
app.use('/api/user',UserRouter)









app.get('/', (req, res)=>{
    
    res.send("<h1>Hello world</h1>")
})


app.listen(PORT, ()=>{
    mongoose.connect(database).then(()=>console.log("The database is conneted")).catch((err)=>{console.log(err)})
    console.log(`the server is running on port ${PORT}!!!`)
   
})

app.use(Handlerror)
