const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'You are not logged in! Please log in to get access',
    });
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'Avaliable',
    },
  });
  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'The owner of this token it not longer available',
    });
  }

  //only if you have the functionality to change password
  /*
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      const changedTimeStamp = parseInt(
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed password!, please login again.',
          401
        )
      );
    }
  }
  */

  req.sessionUser = user;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      res.status(403).json({
        status: 'error',
        message: 'you do not have permission to perfom this action.!',
      });
    }

    next();
  };
};
