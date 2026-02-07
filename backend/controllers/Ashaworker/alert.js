import Alert from "../../Models/Alert.js";
import Ashaworker from "../../Models/Ashaworker.js";
export const getalertsbylocation=async(req,res)=>{
  try{ const ashaprofile=await Ashaworker.findOne({AshaworkerId:req.user.id});
  const{state,district,village}=ashaprofile.location;
  const alerts=await Alert.find({"location.State":state,"location.district":district,"location.village":village});
  return res.status(200).json({
    success:true,
    message:"Alerts fetched successfully",
    alerts
  })
}
catch(error){
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
 
}