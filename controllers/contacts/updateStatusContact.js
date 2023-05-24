const contactsSchema = require("../../models/contacts/index");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      return res
        .status(400)
        .json({ code: 400, message: "missing field favorite" });
    }

    const updatedContact = await contactsSchema.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
