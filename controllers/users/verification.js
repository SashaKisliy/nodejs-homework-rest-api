const userModel = require("../../models/users/users");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userModel.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({ code: 404, message: "Not found" });
  }

  await userModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
