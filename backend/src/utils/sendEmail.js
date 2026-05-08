const { Resend } = require("resend");
const { RESEND_API_KEY } = require("../config/config");

const resend = new Resend(RESEND_API_KEY);

const sendEmail = async (toEmail, subject, text) => {
  if (!RESEND_API_KEY) {
    console.error("EMAIL ERROR: RESEND_API_KEY is missing!");
    return;
  }

  try {
    const data = await resend.emails.send({
      from: "Dev Tinder <onboarding@resend.dev>",
      to: toEmail,
      subject: subject,
      html: `<p>${text.replace(/\n/g, "<br>")}</p>`,
    });

    console.log("Email sent via Resend:", data);
    return data;
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    throw error;
  }
};

module.exports = sendEmail;
