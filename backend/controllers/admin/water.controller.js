
import watersample from "../../Models/Watersample.js";
export const allwaterreports=async(req,res)=>{
  try {
    const {type,value}=req.query;
    
     let filter={};
     
    

// ✅ If only tab selected
if (type && !value) {
  if (type === "State") {
    filter["location.State"] = { $exists: true };
  }
  if (type === "district") {
    filter["location.district"] = { $exists: true };
  }
  if (type === "village") {
    filter["location.village"] = { $ne: "",  $exists: true };
  }
}

// ✅ If search present
if (value) {
  if (type === "State") {
    filter["location.State"] = { $regex: value, $options: "i" };
  } 
  else if (type === "district") {
    filter["location.district"] = { $regex: value, $options: "i" };
  } 
  else if (type === "village") {
    filter["location.village"] = { $regex: value, $options: "i" };
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

     const waterreports = await watersample.find(filter).populate({path:"collectedBy",
      populate:{
        path: "AshaworkerId" ,
        select: "name email"
    }
     });
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