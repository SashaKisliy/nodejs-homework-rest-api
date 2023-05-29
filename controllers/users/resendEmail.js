const userModel = require("../../models/users/users");
const sendEmail = require("../../sendgrid/helpers/sendEmail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
  if (user.verify) {
    res.status(400).json({ code: 400, message: "bad request" });
  }
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification successful",
  });
};

module.exports = resendVerifyEmail;
