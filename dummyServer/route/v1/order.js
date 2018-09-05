import express from 'express';
import OrderController from '../../controller/order';
import OrderValidation from '../../helpers/orderValidation';


const orderRouter = express.Router();

orderRouter.post(
  '/orders/',
  OrderValidation.validateOrderInput,
  OrderValidation.verifyFoodAndUser,
  OrderController.makeOrder
)
  .get('/orders/', OrderController.getAllOrders);

export default orderRouter;
