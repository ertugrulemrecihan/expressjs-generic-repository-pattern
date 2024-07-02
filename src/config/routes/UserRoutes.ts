import express = require('express');
import UserController = require('../../controllers/UserController');

var router = express.Router();
class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }
  get routes() {
    var controller = this._userController;

    router.get('/users', controller.fetchAll);
    router.post('/users', controller.create);
    router.get('/users/:_id', controller.findById);

    return router;
  }
}

Object.seal(UserRoutes);
export = UserRoutes;
