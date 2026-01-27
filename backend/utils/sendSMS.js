
import twilio from "twilio";
import translate from "@vitalets/google-translate-api";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// ---------------------
// Helper: Send SMS with auto-translation
// ---------------------
export const sendSMS = async (phone, text, lang) => {
  try {
    let translatedText = text;

    // Translate if language is not English
    if (lang && lang !== "en") {
      try {
        const result = await translate(text, { to: lang });
        translatedText = result.text;
      } catch (err) {
        console.error(
          `⚠️ Translation failed for lang=${lang}, fallback to English`
        );
      }
    }

    // Send SMS via Twilio
    const msg = await client.messages.create({
      body: translatedText,
      from: TWILIO_PHONE,
      to: phone.startsWith("+") ? phone : `+91${phone}`,
    });

    return { success: true, sid: msg.sid, translated: translatedText };
  } catch (err) {
    console.error(`❌ SMS sending failed to ${phone}:`, err.message);
    return { success: false, error: err.message };
  }
};
