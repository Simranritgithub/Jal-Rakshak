import watersample from "../../Models/Watersample.js";
import Ashaworker from "../../Models/Ashaworker.js";
export const getwaterreportsbyid=async(req,res)=>{
  try {
    const {value,type}=req.query;
    const ashaProfile = await Ashaworker.findOne({
  AshaworkerId: req.user.id
});

    let filter ={collectedBy:ashaProfile._id};
    if(value){
      if(type==="State"){

        filter["location.State"]={$regex:value,$options:"i"};

      }
      else if(type==="district"){

        filter["location.district"]={$regex:value,$options:"i"};

      }
     else if(type==="village"){

        filter["location.village"]={$regex:value,$options:"i"};

      }
      else {
    // all tab
    filter.$or = [
      { "location.State": { $regex: value, $options: "i" } },
      { "location.district": { $regex: value, $options: "i" } },
      { "location.village": { $regex: value, $options: "i" } }
    ];
  }
    }
    if(type && !value){
      if (type === "State") {
    filter["location.State"] = { $ne: "",$exists: true };
  }
  if (type === "district") {
    filter["location.district"] = {$ne: "", $exists: true };
  }
  if (type === "village") {
    filter["location.village"] = { $ne: "",  $exists: true };
  }
   
    }
  const waterreports = await watersample.find(filter).populate({path:"collectedBy",select: "AshaworkerId",populate:{
    path:"AshaworkerId",
    select:"name email"
  }})

  return res.status(200).json({
      success:true,
      message:"Water reports retrieved successfully",
      waterreports
     })
     

    

  } catch (error) {
     return res.status(500).json({
      success:false,
      message:error.message
     })
  }
}