const userModel = require("../../models/users/users");
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    // console.log(req.body);

    if (!password || !email) {
      return res
        .status(400)
        .json({ code: 400, message: "Provide required all fields " });
    }

    const user = await userModel.findOne({ email });

    const isValidPassword = brypt.compareSync(password, user.password);

    if (!user || !isValidPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, "sano", { expiresIn: "2h" });

    user.token = token;
    await user.save();

    res.status(200).json({
      code: 200,
      message: "Success",
      data: { email: user.email, token: user.token },
    });
    console.log(token);
  } catch (error) {
    console.log(error.message);
  }
};

// function generateToken(data) {
//   const payload = {
//     ...data,
//   };
//   return jwt.sign(payload, "sano", { expiresIn: "2h" });
// }

module.exports = loginUser;
