import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  AshaworkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true,
    unique: true

  },
  age: {
    type: Number,
    required: true 
  },
  gender:{
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String, 
    required: true
  },
  location: {
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  village: {
    type: String,
    
  }
},
status:{
    type:String,
    enum:["Pending","Approved","Rejected"],
    default:"Pending"
  }
  
}, { timestamps: true });

export default mongoose.model("Ashaworker", profileSchema);