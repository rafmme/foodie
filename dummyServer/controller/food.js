import foods from '../model/foods';
/**
 * @class AuthController
 */
export default class FoodController {
  /**
      * @description handles fetching of all food items
      * @param {*} req - Incoming Request object
      * @param {*} res - Incoming Message
      * @returns {object} res - Route response
      */
  static getAllFoods(req, res) {
    return res.status(200).send({
      success: true,
      status: 200,
      message: 'All available food items',
      foods
    });
  }
}
