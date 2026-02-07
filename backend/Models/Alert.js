import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Warning","Unsafe"],
    required: true
  },
  location: {
    State:String,
    district:String,
    village:String
  },
  waterSample: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "watersample"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model("Alert",alertSchema);
