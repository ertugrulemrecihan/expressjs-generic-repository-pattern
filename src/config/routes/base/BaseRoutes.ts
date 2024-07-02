import express = require('express');
import UserRoutes = require('../UserRoutes');
var app = express();

class BaseRoutes {
  get routes() {
    app.use('/user', new UserRoutes().routes);

    return app;
  }
}
export = BaseRoutes;
