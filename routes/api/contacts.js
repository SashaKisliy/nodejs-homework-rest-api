const express = require("express");
const router = express.Router();

const { contactsCntrl } = require("../../controllers/index");
const auth = require("../../middlewars/authMiddlewar");

router.get("/", auth, contactsCntrl.getAllContacts);

router.get("/:contactId", auth, contactsCntrl.getByIdContact);

router.post("/", auth, contactsCntrl.createContact);

router.delete("/:contactId", auth, contactsCntrl.removeContact);

router.put("/:contactId", auth, contactsCntrl.contactsUpdate);

router.patch("/:contactId/favorite", auth, contactsCntrl.updateStatusContact);

module.exports = router;
