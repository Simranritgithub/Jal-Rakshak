import Alert from "../../Models/Alert.js";
import watersample from "../../Models/Watersample.js";
import { NotFoundError, BadRequestError } from "../../utils/Specificerror.js";

export const sendAlert = async (req, res, next) => {
  try {
    const { waterSampleId, message } = req.body;

    const sample = await watersample.findById(waterSampleId);

    if (!sample) {
      return next(new NotFoundError("Water Sample"));
    }

    if (sample.alertSent) {
      return next(
        new BadRequestError("Alert already sent for this sample")
      );
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
      success: true,
      message: "Alert sent successfully",
      alert
    });

  } catch (err) {
    next(err); 
  }
};
export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find()
      .populate("waterSample")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      alerts
    });

  } catch (err) {
    next(err);
  }
};
