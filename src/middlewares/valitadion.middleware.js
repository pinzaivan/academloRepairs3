const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createLoginValidation = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be null')
    .isEmail()
    .withMessage('email must be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('passoword cant be null')
    .isLength({ min: 6 })
    .withMessage('password had to almost 6 caracters')
    .matches(/[A-Z]/)
    .withMessage('password have to contain one mayus letter'),

  validateFields,
];

exports.createUserValidation = [
  body('name').notEmpty().withMessage('cannot be null'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be null')
    .isEmail()
    .withMessage('email must be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('passoword cant be null')
    .isLength({ min: 6 })
    .withMessage('password had to almost 6 caracters')
    .matches(/[A-Z]/)
    .withMessage('password have to contain one mayus letter'),

  validateFields,
];
exports.updateUserValidation = [
  body('name').notEmpty().withMessage('cannot be null'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be null')
    .isEmail()
    .withMessage('email must be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('passoword cant be null')
    .isLength({ min: 6 })
    .withMessage('password had to almost 6 caracters')
    .matches(/[A-Z]/)
    .withMessage('password have to contain one mayus letter'),

  validateFields,
];

exports.CreateRepairValidation = [
  body('description').notEmpty().withMessage('description cant be null'),
  validateFields,
];

exports.updateRepairValidation = [
  body('name').notEmpty().withMessage('cannot be null'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be null')
    .isEmail()
    .withMessage('email must be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('passoword cant be null')
    .isLength({ min: 6 })
    .withMessage('password had to almost 6 caracters')
    .matches(/[A-Z]/)
    .withMessage('password have to contain one mayus letter'),

  validateFields,
];
