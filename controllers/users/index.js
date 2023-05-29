const registrationUser = require("./registration");
const loginUser = require("./login");
const logoutUser = require("./logout");
const currentUser = require("./current");
const newAvatar = require("./newAvatar");
const verification = require("./verification");
const resendEmail = require("./resendEmail");

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  newAvatar,
  verification,
  resendEmail,
};
