const express = require('express');

//controllers
const repairController = require('./../controllers/repair.controller');
//middlewares
const valitadtionMiddelware = require('../middlewares/valitadion.middleware');
const repairMiddleware = require('../middlewares/repair.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(repairController.createRepair);

router.use(authMiddleware.protect);

router
  .use('/:id', repairMiddleware.existRepair)
  .use(authMiddleware.restrictTo('Employee'))
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
