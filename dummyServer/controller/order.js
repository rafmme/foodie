import orders from '../model/orders';
/**
 * @class OrderController
 */
export default class OrderController {
  /**
      * @description handles placing an order
      * @param {*} req - Incoming Request object
      * @param {*} res - Incoming Message
      * @returns {object} res - Route response
      */
  static makeOrder(req, res) {
    const {
      foodId,
      customerId,
      quantity,
      deliveryAddress
    } = req.body;
    const order = {
      id: orders.length + 1,
      foodId: Number.parseInt(foodId, 10),
      customerId: Number.parseInt(customerId, 10),
      quantity: Number.parseInt(quantity, 10),
      deliveryAddress: deliveryAddress.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (orders.push(order)) {
      return res.status(201).send({
        success: true,
        status: 201,
        message: 'Order was made successfully',
        order
      });
    }
    return res.status(500).send({
      success: false,
      status: 500,
      error: {
        message: 'Something went wrong on the server'
      }
    });
  }
}
