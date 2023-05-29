const express = require("express");
const auth = require("../../middlewars/authMiddlewar");
const router = express.Router();

const { usersCntrl } = require("../../controllers/index");
const upload = require("../../middlewars/uploadAvatar");

router.post("/register", usersCntrl.registrationUser);
router.post("/login", usersCntrl.loginUser);

router.get("/logout", auth, usersCntrl.logoutUser);
router.get("/current", auth, usersCntrl.currentUser);
router.patch("/avatar", auth, upload.single("avatar"), usersCntrl.newAvatar);
router.get("/verify/:verificationToken", usersCntrl.verification);
router.post("/verify", usersCntrl.resendEmail);

module.exports = router;
