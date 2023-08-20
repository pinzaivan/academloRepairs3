const User = require('../models/user.model');

exports.existUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'Avaliable',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user with id ${id}, not found`,
    });
  }

  req.user = user;
  next();
};
exports.existUserEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'Avaliable',
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `user with email ${email}, not found`,
    });
  }

  req.user = user;
  next();
};
