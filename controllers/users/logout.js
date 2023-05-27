const userModel = require("../../models/users/users");

const logoutUser = async (req, res) => {
  try {
    const id = req.user;
    const user = await userModel.findByIdAndUpdate(id, { token: null });
    res.status(200).json({
      code: 200,
      message: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logoutUser;
