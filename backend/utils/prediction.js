// Note the .js extension
//  import { PrismaClient } from "@prisma/client";
 import axios from 'axios';
//  const prisma = new PrismaClient();
/**
 * Augments the raw ML model prediction with actionable recommendations and potential diseases.
 * @param {object} prediction - The raw prediction object from the ML model.
 * @returns {object} An augmented prediction object with `diseases` and `recommendation`.
 */
function augmentPrediction(prediction) {
  // ... (no changes to the function's internal logic)
  const { risk_level, risk_probability } = prediction;
  let diseases = [];
  let recommendation = '';
  if (risk_level === 'High' && risk_probability > 0.7) {
    diseases = ['Cholera', 'Typhoid', 'Diarrhea', 'Acute Gastroenteritis'];
    recommendation =
      'High risk of water-borne disease outbreak detected. Advise residents to boil all drinking water, maintain strict sanitation, and report symptoms immediately. Prepare ASHA workers for immediate community surveillance.';
  } else if (risk_level === 'Medium' && risk_probability > 0.4) {
    diseases = ['Dengue', 'Malaria', 'Viral Fever'];
    recommendation =
      'Moderate risk detected. Increase surveillance of stagnant water sources and monitor for fever clusters. Advise residents on mosquito protection and basic hygiene precautions.';
  } else {
    diseases = [];
    recommendation =
      'Risk level is currently low. Continue standard monitoring protocols and public health awareness campaigns.';
  }
  return { ...prediction, diseases, recommendation };
}

/**
 * Generates a prediction for a village by calling the external ML model.
 * @param {string} villageId - The database ID of the village.
 * @param {object} inputData - The data required by the ML model.
 * @returns {Promise<object>} The final, augmented prediction saved in the database.
 */
export const generatePredictionForVillage = async (villageId, inputData) => {
    // ... (no changes to the function's internal logic)
    const ML_API_URL = process.env.ML_MODEL_URL;
    if (!ML_API_URL) {
      throw new Error('ML_MODEL_URL is not defined in environment variables.');
    }
    try {
      console.log('Sending data to ML model:', inputData);
      const response = await axios.post(ML_API_URL, inputData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const rawPrediction = response.data;
      console.log('Received raw prediction:', rawPrediction);
      const augmentedPrediction = augmentPrediction(rawPrediction);
      const dataToSave = {
        villageId: villageId,
        date: new Date(augmentedPrediction.date),
        anomalyScore: augmentedPrediction.anomaly_score,
        isAnomaly: augmentedPrediction.is_anomaly,
        riskLevel: augmentedPrediction.risk_level.toUpperCase(),
        riskProbability: augmentedPrediction.risk_probability,
        predictionTimestamp: new Date(augmentedPrediction.prediction_timestamp),
        diseases: augmentedPrediction.diseases,
        recommendation: augmentedPrediction.recommendation,
      };
      const savedPrediction = await prisma.prediction.create({ data: dataToSave });
      console.log('Prediction saved successfully:', savedPrediction.id);
      return savedPrediction;
    } catch (error) {
      if (error.response) {
        console.error('Error from ML Model API:', error.response.data);
        throw new Error(`ML Model API responded with status ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received from ML Model API:', error.request);
        throw new Error('Could not connect to the ML Model service.');
      } else {
        console.error('Error setting up prediction request:', error.message);
        throw new Error('An internal error occurred while generating the prediction.');
      }
    }
};