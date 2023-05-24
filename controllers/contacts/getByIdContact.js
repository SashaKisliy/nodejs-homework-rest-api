const contactsSchema = require("../../models/contacts/index");

const getByIdContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const oneContact = await contactsSchema.findOne({
      _id: contactId,
    });

    if (!oneContact) {
      return res.status(404).json({ code: 404, message: err.message });
    }

    res.json({ status: "success", code: 200, data: { oneContact } });
  } catch (error) {
    next(error);
  }
};

module.exports = getByIdContact;
