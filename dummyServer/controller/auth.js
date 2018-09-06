import Users from '../model/users';
import {
  encryptPassword,
  generateFakeToken
} from '../helpers/utils';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
    * @description handles creation/addition of new user on the app
    * @param {*} req - Incoming Request object
    * @param {*} res - Incoming Message
    * @returns {object} res - Route response
    */
  static async createUser(req, res) {
    const {
      fullname,
      email
    } = req.body;
    const password = encryptPassword(req.body.password);
    const user = {
      id: Users.length + 1,
      fullname,
      password,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (Users.push(user)) {
      user.password = '**********';
      return res.status(201).send({
        success: true,
        status: 201,
        message: 'User account created successfully',
        user,
        token: generateFakeToken()
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
