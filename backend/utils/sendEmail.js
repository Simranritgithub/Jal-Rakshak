import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or "Outlook", "SES" etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Health Surveillance Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

export default sendEmail;