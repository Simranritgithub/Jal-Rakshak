import Alert from "../../Models/Alert.js";
import watersample from "../../Models/Watersample.js";

export const sendAlert = async (req,res)=>{
  try{
    const { waterSampleId, message } = req.body;

    const sample = await watersample.findById(waterSampleId);

    if(!sample){
      return res.status(404).json({success:false,message:"Sample not found"});
    }
    if (sample.alertSent) {
      return res.status(400).json({
        success: false,
        message: "Alert already sent for this sample"
      });
    }

    const alert = await Alert.create({
      message,
      level: sample.status,
      location: sample.location,
      waterSample: waterSampleId
    });
     sample.alertSent = true;
    await sample.save();
    res.status(201).json({
      success:true,
      message:"Alert sent successfully",
      alert
    });

  }catch(err){
    res.status(500).json({success:false,message:err.message});
  }
}


// GET all alerts
export const getAlerts = async (req, res) => {
  try {

    const alerts = await Alert.find()
      .populate("waterSample")   // bring water sample details
      .sort({ createdAt: -1 });  // latest first

    return res.status(200).json({
      success: true,
      alerts
    });

  } catch (err) {
    console.error("Error fetching alerts:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
