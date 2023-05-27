const currentUser = async (req, res) => {
  const { subscription, email } = req.body;
  res.status(200).json({
    code: 200,
    message: "Success",
    data: {
      user: {
        subscription: subscription,
        email: email,
      },
    },
  });
};

module.exports = currentUser;
