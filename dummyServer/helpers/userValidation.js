import Users from '../model/users';

/**
 * @class UserValidation
 */
export default class UserValidation {
  /**
 * @description - Verify if User Exist
 *
 * @param {object} req HTTP Request
 * @param {object} res HTTP Response
 * @param {object} next call next funtion/handler
 * @returns {object} returns res parameter
 */
  static verifyUserExist(req, res, next) {
    const { email } = req.body;
    let userExist = false;
    for (let i = 0; i < Users.length; i += 1) {
      if (Users[i].email === email) {
        userExist = true;
        break;
      }
    }
    if (userExist) {
      return res.status(409).send({
        success: false,
        status: 409,
        error: {
          message: 'This email is already taken'
        }
      });
    }
    return next();
  }

  /**
 * @description - Validate User Sign Up data
 *
 * @param {object} req HTTP Request
 * @param {object} res HTTP Response
 * @param {object} next call next funtion/handler
 * @returns {object} returns res parameter
 */
  static validateSignUpData(req, res, next) {
    const error = {};
    req.sanitizeBody('fullname').trim();
    req.sanitizeBody('password').trim();
    req.sanitizeBody('email').trim();

    req.checkBody('fullname', 'Full Name is required, must be between 3-100 characters')
      .notEmpty().trim().isLength({ min: 3, max: 100 })
      .isString();
    req.checkBody('password', 'Password is required, must be between 8-20 characters')
      .notEmpty().trim().isLength({ min: 8, max: 20 })
      .isString();
    req.checkBody('email', 'Email is required, and must be a valid email')
      .isEmail().trim();
    const errors = req.validationErrors();
    if (errors) {
      errors.forEach((e) => {
        error[e.param] = e.msg;
      });
      return res.status(400).send({
        success: false,
        status: 400,
        error,
      });
    }
    return next();
  }
}
