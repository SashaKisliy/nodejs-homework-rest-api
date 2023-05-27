const contactsSchema = require("../../models/contacts/index");

const createContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        code: 400,
        message: "Set name for contact",
      });
    }
    const checkContact = await contactsSchema.findOne({ name, owner: _id });
    if (checkContact) {
      res.status(409).json({ code: 409, message: "Contact already exist" });
    }
    const contact = await contactsSchema.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      result: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createContact;
