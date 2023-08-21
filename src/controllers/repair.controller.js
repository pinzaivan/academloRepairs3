const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepair = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['Pending', 'Completed'],
    },
    include: {
      model: User,
      attributes: ['id', 'name', 'email'],
    },
  });

  res.status(200).json({
    status: 'success',
    repairs,
  });
});
exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  res.status(200).json({
    status: 'success',
    repair,
  });
});
exports.createRepair = catchAsync(async (req, res) => {
  console.log('llegaqui');
  const { date, status, userId, description, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    status,
    userId,
    description,
    motorsNumber,
  });

  res.status(201).json({
    status: 'sucess',
    repair,
  });
});
exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'Completed' });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});
exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'Cancelled' });
  res.status(200).json({
    status: 'suscces',
    message: 'user deleted succesfully',
  });
});
