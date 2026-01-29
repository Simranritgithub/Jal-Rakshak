import mongoose from "mongoose";
const Userschema=new mongoose.Schema({
  name:{
       type:String,
       required:true
  },
  email:
  {
       type:String,
       required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:['Asha worker','Admin'],
   required:true
  },

},{timestamps:true});
const user = mongoose.model('user',Userschema);
export default user;
  
