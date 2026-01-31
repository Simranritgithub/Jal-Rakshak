import Ashaworker from "../../Models/Ashaworker.js";

export const createashaprofile=async(req,res)=>{
  try {
    const {age,gender,address,phone,location}=req.body;
    const state = location?.state;
const district = location?.district;
const village = location?.village;
    const AshaworkerId=req.user.id;
    const existingprofile=await Ashaworker.findOne({AshaworkerId}).populate("user","name email");
    if(existingprofile){
      return res.status(400).json({
        success:false,
        message:"Profile already exists"
        
      })
    }
  
    const Profile=await Ashaworker.create({AshaworkerId,
      age,gender,address,phone,
      location:{state,district,village}},
      
      
    );
    return res.status(201).json({
        success:true,
        message:"Profile created successfully",
        Profile
        
      })

  } catch (error) {
     return res.status(500).json({
        success:false,
        message:error.message
        
      })
  }
}
