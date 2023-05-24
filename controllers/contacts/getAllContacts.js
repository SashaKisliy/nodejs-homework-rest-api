const contactsSchema = require("../../models/contacts/index");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsSchema.find();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
