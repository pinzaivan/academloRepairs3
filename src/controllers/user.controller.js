const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');
exports.findAllUser = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'Avaliable',
    },
  });

  return res.status(200).json({
    status: 'success',
    users,
  });
});
exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    user,
  });
});
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  const token = generateJWT(user.id);

  return res.status(201).json({
    status: 'sucess',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'No avaliable' });
  return res.status(200).json({
    status: 'suscces',
    message: 'user deleted succesfully',
  });
});
exports.login = async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'incorrect email or password',
    });
  }

  const token = await generateJWT(user.id);
  res.status(200).json({
    status: 'success',
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
