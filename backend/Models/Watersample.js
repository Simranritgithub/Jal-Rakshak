import mongoose from "mongoose";

const WaterSampleSchema = new mongoose.Schema({

  location: {
    State:{
      type:"String",
      required:true
    },
    district:{
      type:"String",
      required:true
    },
    village:{
      type:"String"
    }
  },

  ph: {
    type: Number,
    required: true
  },

  turbidity: {
    type: Number,
    required: true
  },

  tds: {
    type: Number,
    required: true
  },

  temperature: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Safe", "Warning", "Unsafe"],
    required: true
  },

  remarks: {
    type: String,
    default: ""
  },

  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  isOffline: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const watersample = mongoose.model("watersample", WaterSampleSchema);

export default watersample;
