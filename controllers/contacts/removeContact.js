const contactsSchema = require("../../models/contacts/index");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsSchema.findByIdAndRemove({ _id: contactId });
    if (!result) {
      return res.status(404).json({ message: err.message });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
