import emailSetUp from "../config/email.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await emailSetUp.sendMail({
      from: `"Food_order" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log("Email sending error:", error);
    throw error;
  }
};

export default sendEmail;
