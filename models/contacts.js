const contactsSchema = require("../models/contacsModel");

const listContacts = async () => {
  const contacts = await contactsSchema.find();
  return contacts;
};

const getContactById = async (contactId) => {
  return contactsSchema.findOne({
    _id: contactId,
  });
};

const removeContact = async (contactId) => {
  return contactsSchema.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return contactsSchema.create({ ...body });
};

const updateContact = async (contactId, body) => {
  return contactsSchema.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
};

const updateStatusContact = async (contactId, favorite) => {
  return contactsSchema.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
