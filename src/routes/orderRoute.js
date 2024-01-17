const express = require("express");
const router = express.Router();
const jwt = require("../middlewares/jwt.js");




const orderController = require("../controllers/orderController.js");


router
  .route('/:service_id')
  .post(jwt.verifyEmployerToken, orderController.workerOrder)

  router
  .route('/:worker_id/:service_id/accept')
  .post(jwt.verifyOrderToken, orderController.workerAccept)

  router
  .route('/:worker_id/:service_id/decline')
  .post(jwt.verifyOrderToken, orderController.workerAccept)

  router
  .route('/:order_id')
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder);
  
router
  .route('/')
  .get(orderController.getOrder)

  module.exports = router;
