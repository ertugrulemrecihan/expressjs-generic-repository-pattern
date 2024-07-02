import express = require('express');
import UserRoutes = require('../UserRoutes');
import BookRoutes = require('../BookRoutes');
const app = express();

class BaseRoutes {
  get routes() {
    app.use('/user', new UserRoutes().routes);
    app.use('/book', new BookRoutes().routes);

    return app;
  }
}
export = BaseRoutes;
