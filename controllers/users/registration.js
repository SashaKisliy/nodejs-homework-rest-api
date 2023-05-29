const userModel = require("../../models/users/users");
const brypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendEmail = require("../../sendgrid/helpers/sendEmail");
const { nanoid } = require("nanoid");

const registrationUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ code: 400, message: "Provide all required fields" });
    }

    const candidate = await userModel.findOne({ email });

    if (candidate) {
      return res
        .status(409)
        .json({ code: 409, message: `Email ${email} has been used` });
    }

    const verificationToken = nanoid();
    const avatarUrl = gravatar.url(email);
    const hashPassword = brypt.hashSync(password, 10);

    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please verify your email</a>`,
    };

    await sendEmail(mail);

    const newUser = await userModel.create({
      ...req.body,
      password: hashPassword,
      avatarUrl,
      verificationToken,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Can not save new user to database" });
    }

    res.status(200).json({
      code: 200,
      message: "Success",
      data: { name: newUser.name, email: newUser.email },
      avatarUrl,
      verificationToken,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = registrationUser;
