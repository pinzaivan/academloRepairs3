const Repair = require('../models/repairs.model');

exports.findAllRepair = async (req, res, next) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'Pending',
      },
    });

    res.status(200).json({
      status: 'success',
      repairs,
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
exports.findOneRepair = async (req, res) => {
  try {
    const { repair } = req;
    res.status(200).json({
      status: 'success',
      repair,
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
exports.createRepair = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};
exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'Completed' });

    res.status(200).json({
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
exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'Cancelled' });
    res.status(200).json({
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
