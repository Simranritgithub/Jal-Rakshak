import watersample from "../../Models/Watersample.js";
export const getwaterreportsbyid=async(req,res)=>{
  try {
    const {value,type}=req.query;
    let filter ={};
    if(value){
      if(type==="State"){

        filter[location.State]=={$regex:value,$options:"i"};

      }
      if(type==="district"){

        filter[location.district]=={$regex:value,$options:"i"};

      }
      if(type==="village"){

        filter[location.village]=={$regex:value,$options:"i"};

      }
    }
    if(type){
      if (type === "State") {
    filter["location.State"] = { $ne: "",$exists: true };
  }
  if (type === "district") {
    filter["location.district"] = {$ne: "", $exists: true };
  }
  if (type === "village") {
    filter["location.village"] = { $ne: "",  $exists: true };
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
  const waterreports = await watersample.find({collectedBy:req.user.id}).populate({path:"collectedBy",populate:{
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