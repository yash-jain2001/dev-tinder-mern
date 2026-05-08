const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_PASS } = require("../config/config");

const sendEmail = async (toEmail, subject, text) => {
  if (!GMAIL_USER || !GMAIL_PASS) {
    console.error("EMAIL ERROR: GMAIL_USER or GMAIL_PASS is missing from environment variables!");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("Mail server connection verified");

    const mailOptions = {
      from: GMAIL_USER,
      to: toEmail,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
