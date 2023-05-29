const path = require("path");
const dotenv = require("dotenv");
const configPath = path.join(__dirname, "../", "../", "config", ".env");
dotenv.config({ path: configPath });

const sgMail = require("@sendgrid/mail");

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);
const sendEmail = async (data) => {
  const email = { ...data, from: "sano.doto@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
