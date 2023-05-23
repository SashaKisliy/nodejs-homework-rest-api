const contactsMethods = require("../models/contacts");

const get = async (req, res, next) => {
  try {
    const contacts = await contactsMethods.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const oneContact = await contactsMethods.getContactById(contactId);

    if (!oneContact) {
      return res.status(404).json({ message: err.message });
    }

    res.json({ status: "success", code: 200, data: { oneContact } });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        code: 400,
        message: "Set name for contact",
      });
    }
    const contact = await contactsMethods.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      result: contact,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsMethods.updateContact(contactId, req.body);
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

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      return res
        .status(400)
        .json({ code: 400, message: "missing field favorite" });
    }

    const updatedContact = await contactsMethods.updateStatusContact(
      contactId,
      favorite
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

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsMethods.removeContact(contactId);
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

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  updateStatus,
};
