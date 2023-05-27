const express = require("express");
const auth = require("../../middlewars/authMiddlewar");
const router = express.Router();

const { usersCntrl } = require("../../controllers/index");

router.post("/register", usersCntrl.registrationUser);
router.post("/login", usersCntrl.loginUser);

router.get("/logout", auth, usersCntrl.logoutUser);
router.get("/current", auth, usersCntrl.currentUser);

module.exports = router;
