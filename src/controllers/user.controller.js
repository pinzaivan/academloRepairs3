const User = require('../models/user.model');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');
exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'Avaliable',
      },
    });

    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.findOneUser = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.createUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: 'No avaliable' });
    return res.status(200).json({
      status: 'suscces',
      message: 'user deleted succesfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
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
