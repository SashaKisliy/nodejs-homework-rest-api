const contactsSchema = require("../../models/contacts/index");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await contactsSchema
      .find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      })
      .populate("owner", "_id email subscription");

    if (favorite) {
      const contacts = await contactsSchema
        .find({ owner: _id, favorite }, "", {
          skip,
          limit: Number(limit),
        })
        .populate("owner", "_id email subscription");
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
