const contactsSchema = require("../../models/contacts/index");

const contactsUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsSchema.findByIdAndUpdate(
      { _id: contactId },
      { ...req.body },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: error.message });
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

module.exports = contactsUpdate;
