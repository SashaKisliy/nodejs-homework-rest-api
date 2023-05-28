const { model, Schema } = require("mongoose");

const usersShema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    required: [true, "Avatar is required"],
  },
});

module.exports = model("users", usersShema);
