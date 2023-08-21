const Repair = require('../models/repairs.model');

exports.existRepair = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'Pending',
    },
  });
  if (!repair) {
    return next(new AppErro('Repair wiht ${id} not found'));
  }
  req.repair = repair;
  next();
};
