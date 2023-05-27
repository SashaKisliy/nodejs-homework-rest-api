const userModel = require("../../models/users/users");
const brypt = require("bcryptjs");

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

    const hashPassword = brypt.hashSync(password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Can not save new user to database" });
    }

    res
      .status(200)
      .json({ code: 200, message: "Success", data: { name: newUser.name } });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = registrationUser;
