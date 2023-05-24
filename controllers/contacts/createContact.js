const contactsSchema = require("../../models/contacts/index");

const createContact = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        code: 400,
        message: "Set name for contact",
      });
    }
    const contact = await contactsSchema.create({ ...req.body });
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
