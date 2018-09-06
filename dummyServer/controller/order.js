import orders from '../model/orders';
import foods from '../model/foods';
import users from '../model/users';
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

  /**
      * @description handles fetching of all orders
      * @param {*} req - Incoming Request object
      * @param {*} res - Incoming Message
      * @returns {object} res - Route response
      */
  static getAllOrders(req, res) {
    const allOrders = [];
    orders.forEach((order) => {
      // fetch food item details from data structure
      const foodItem = foods.find(food => (food.id === order.foodId));

      // fetch customer info from data structure
      const customer = users.find(user => (order.customerId === user.id));
      const { fullname, email } = customer;
      const customerInfo = {
        userId: customer.id,
        fullname,
        email
      };
      const {
        title,
        description,
        price
      } = foodItem;
      const food = {
        foodId: foodItem.id,
        title,
        description,
        price
      };
      // Push all fetched order info onto allOrders array
      allOrders.push({
        orderId: order.id,
        customer: customerInfo,
        food,
        quantity: order.quantity,
        totalPrice: order.quantity * food.price,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      });
    });
    return res.status(200).send({
      success: true,
      status: 200,
      message: 'All orders fetched successfully',
      orders: allOrders,
    });
  }
}
