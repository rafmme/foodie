import foods from '../model/foods';
import users from '../model/users';

/**
 * @class OrderValidation
 */
export default class OrderValidation {
  /**
 * @description - Validate Order Input
 *
 * @param {object} req HTTP Request
 * @param {object} res HTTP Response
 * @param {object} next call next funtion/handler
 * @returns {object} returns res parameter
 */
  static validateOrderInput(req, res, next) {
    const error = {};
    const {
      foodId,
      quantity,
      customerId,
    } = req.body;
    // Check If foodId value is of type Number
    if (!Number.isSafeInteger(Number.parseInt(foodId, 10))) {
      error.foodId = 'Food ID is required, must be an integer';
    }
    // Check If quantity value is of type Number
    if (!Number.isSafeInteger(Number.parseInt(quantity, 10))) {
      error.quantity = 'Quantity of food to order is required, must be an integer';
    }
    // Check If customerId value is of type Number
    if (!Number.isSafeInteger(Number.parseInt(customerId, 10))) {
      error.customerId = 'Customer ID is required, must be an integer';
    }
    // Sanitize and Validate deliveryAddress input
    req.sanitizeBody('deliveryAddress').trim();
    req.checkBody(
      'deliveryAddress',
      'Delivery address is required, must not be less than 3 characters'
    ).notEmpty().trim().isLength({ min: 3 })
      .isString();
    const errors = req.validationErrors();
    if (errors) {
      errors.forEach((e) => {
        error[e.param] = e.msg;
      });
    }
    if (Object.keys(error).length >= 1) {
      return res.status(400).send({
        success: false,
        status: 400,
        error,
      });
    }
    return next();
  }

  /**
 * @description - Check if User and Food item exists before placing order
 * @param {object} req HTTP Request
 * @param {object} res HTTP Response
 * @param {object} next call next funtion/handler
 * @returns {object} returns res parameter
 */
  static verifyFoodAndUser(req, res, next) {
    const error = {};
    const {
      foodId,
      customerId
    } = req.body;

    // Loop through the users data structure to check if user exists before making order
    for (let k = 0; k < users.length; k += 1) {
      if (users[k].id === Number.parseInt(customerId, 10)) {
        delete error.customerId;
        break;
      } else {
        error.customerId = `Order can't be placed because User with ID ${customerId} doesn't exist`;
      }
    }


    // Loop through the foods data structure to check if food exists before making order
    for (let i = 0; i < foods.length; i += 1) {
      if (foods[i].id === Number.parseInt(foodId, 10)) {
        delete error.foodId;
        break;
      } else {
        error.foodId = `Order can't be placed because Food with ID ${foodId} doesn't exist`;
      }
    }
    if (Object.keys(error).length >= 1) {
      return res.status(404).send({
        success: false,
        status: 404,
        error,
      });
    }
    return next();
  }
}
