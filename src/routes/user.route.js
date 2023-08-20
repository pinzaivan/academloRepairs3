const express = require('express');

//controllers
const userController = require('./../controllers/user.controller.js');

// middlewares
const validationMiddleware = require('../middlewares/valitadion.middleware.js');
const usermiddleware = require('../middlewares/user.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, userController.findAllUser)
  .post(validationMiddleware.createUserValidation, userController.createUser);

router.post('/login', usermiddleware.existUserEmail, userController.login);
router.use(authMiddleware.protect);
router
  .use(usermiddleware.existUser)
  .route('/:id')
  .get(userController.findOneUser)
  .patch(validationMiddleware.updateUserValidation, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
