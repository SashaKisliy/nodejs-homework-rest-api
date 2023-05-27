const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");

    if (tokenType === "Bearer" && token) {
      const decoded = jwt.verify(token, "sano");

      req.user = decoded.id;
      next();
    }
  } catch (error) {
    res.status(404).json({ code: 404, message: "Not found" });
  }
};
