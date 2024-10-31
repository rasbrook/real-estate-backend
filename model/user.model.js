import mongoose from "mongoose";

const Userschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
          
        },
        avator:{
            type:String,
            default:"https://th.bing.com/th/id/OIP.OWHqt6GY5jrr7ETvJr8ZXwHaHa?rs=1&pid=ImgDetMain"
        },
        bio:{
            type:String, 
            default:'User have No Bio'
        },
        phone:{
            type:Number, 
            
        }
    }, 
    {
        timestamps:true
    }
)
const User=mongoose.model('User', Userschema);


export default User