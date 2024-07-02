import express = require('express');
import UserController = require('../../controllers/UserController');
import BodyValidator from '../middlewares/BodyValidator';
import { loginSchema, registerSchema } from '../../schemas/UserSchema';

var router = express.Router();
class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }
  get routes() {
    const controller = this._userController;

    const bodyValidator = new BodyValidator();

    router.post(
      '/login',
      bodyValidator.validate(loginSchema),
      controller.login
    );
    router.post(
      '/register',
      bodyValidator.validate(registerSchema),
      controller.register
    );

    return router;
  }
}

Object.seal(UserRoutes);
export = UserRoutes;
