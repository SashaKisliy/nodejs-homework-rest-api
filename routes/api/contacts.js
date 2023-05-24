const express = require("express");
const router = express.Router();

const contactsCntrl = require("../../controllers/index");

router.get("/", contactsCntrl.getAllContacts);

router.get("/:contactId", contactsCntrl.getByIdContact);

router.post("/", contactsCntrl.createContact);

router.delete("/:contactId", contactsCntrl.removeContact);

router.put("/:contactId", contactsCntrl.contactsUpdate);

router.patch("/:contactId/favorite", contactsCntrl.updateStatusContact);

module.exports = router;
