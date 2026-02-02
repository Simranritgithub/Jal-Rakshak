import watersample from "../../Models/Watersample.js";
import Ashaworker from "../../Models/Ashaworker.js";


export const createWaterSample = async (req, res) => {
  try {
    const {
      location,
      ph,
      turbidity,
      tds,
      temperature,
      status,
      remarks
    } = req.body;
    const {State,district,village}=location;
    const AshaworkerId=req.user.id;
    const ashaProfile=await Ashaworker.findOne({AshaworkerId}).populate("AshaworkerId", "name email")

    const sample = await watersample.create({
      location:{State,district,village},
      ph,
      turbidity,
      tds,
      temperature,
      status,
      remarks,
      collectedBy: ashaProfile._id,
      
    });
    console.log("sample craeted",sample);
//console.log("sending response...");

    res.status(201).json({
      success: true,
      message: "Water sample created",
      sample,
      collectedBy: {
    name: ashaProfile.AshaworkerId.name,
    email: ashaProfile.AshaworkerId.email
  }
    });

  } catch (error) {
    

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

