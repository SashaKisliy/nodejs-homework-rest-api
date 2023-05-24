const getAllContacts = require("./getAllContacts");
const getByIdContact = require("./getByIdContact");
const createContact = require("./createContact");
const removeContact = require("./removeContact");
const updateStatusContact = require("./updateStatusContact");
const contactsUpdate = require("./contactsUpdate");

module.exports = {
  getAllContacts,
  getByIdContact,
  createContact,
  removeContact,
  updateStatusContact,
  contactsUpdate,
};
