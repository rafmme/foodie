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

  /**
      * @description handles fetching of one food item
      * @param {*} req - Incoming Request object
      * @param {*} res - Incoming Message
      * @returns {object} res - Route response
      */
  static getFood(req, res) {
    const id = Number.parseInt(req.params.id, 10);
    const food = foods.find(el => (el.id === id));
    if (food) {
      return res.status(200).send({
        success: true,
        status: 200,
        message: 'Food was fetched successfully',
        food
      });
    }
    return res.status(404).send({
      success: false,
      status: 404,
      error: {
        message: `No Food matches the ID of ${id}`
      }
    });
  }
}
