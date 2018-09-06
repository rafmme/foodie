import express from 'express';
import OrderController from '../../controller/order';
import OrderValidation from '../../helpers/orderValidation';
import { validateId } from '../../helpers/utils';


const orderRouter = express.Router();

orderRouter.post(
  '/orders/',
  OrderValidation.validateOrderInput,
  OrderValidation.verifyFoodAndUser,
  OrderController.makeOrder
)
  .get('/orders/', OrderController.getAllOrders)
  .get('/orders/:id', validateId, OrderController.getOrder)
  .put(
    '/orders/:id',
    validateId,
    OrderValidation.validateOrderUpdateData,
    OrderController.updateOrder
  );

export default orderRouter;
