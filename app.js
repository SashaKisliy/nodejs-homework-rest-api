const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const userModel = require("./models/users/users");
const authMiddlewar = require("./middlewars/authMiddlewar");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/api/users", usersRouter);

// app.post("/register", async (req, res) => {
//   try {
//     const { name, password, email } = req.body;

//     if (!name || !password || !email) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Provide all required fields" });
//     }

//     const candidate = await userModel.findOne({ email });

//     if (candidate) {
//       return res
//         .status(409)
//         .json({ code: 409, message: "Candidate not found" });
//     }

//     const hashPassword = brypt.hashSync(password, 10);
//     console.log(hashPassword);

//     const newUser = await userModel.create({
//       ...req.body,
//       password: hashPassword,
//     });

//     if (!newUser) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Can not save new user to database" });
//     }

//     res
//       .status(200)
//       .json({ code: 200, message: "Success", data: { name: newUser.name } });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { password, email } = req.body;
//     // console.log(req.body);

//     if (!password || !email) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Provide required all fields " });
//     }

//     const user = await userModel.findOne({ email });
//     console.log(password);
//     console.log(user.password);

//     const isValidPassword = brypt.compareSync(password, user.password);

//     if (!user || !isValidPassword) {
//       return res
//         .status(400)
//         .json({ code: 400, message: "Invalid email or password" });
//     }

//     const frieds = ["Sasha", "Sasasa"];

//     const token = generateToken({ frieds, id: user._id });

//     user.token = token;
//     await user.save();

//     res.status(200).json({
//       code: 200,
//       message: "Success",
//       data: { email: user.email, token: user.token },
//     });
//     console.log(token);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// function generateToken(data) {
//   const payload = {
//     ...data,
//   };
//   return jwt.sign(payload, "sano", { expiresIn: "2h" });
// }

// app.get("/logout", authMiddlewar, async (req, res) => {
//   try {
//     const id = req.user;
//     const user = await userModel.findByIdAndUpdate(id, { token: null });
//     res.status(200).json({
//       code: 200,
//       message: "Success",
//       data: user,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
