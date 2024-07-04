import express = require('express');

import MethodOverride = require('../../MethodOverride');
import BaseRoutes = require('./../../routes/base/BaseRoutes');
import { sequelizeInstance } from '../../../app/dataAccess/DataAccess';

class MiddlewaresBase {
  static get configuration() {
    var app = express();

    sequelizeInstance.sync({
      alter: true,
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(MethodOverride.configuration());
    app.use(new BaseRoutes().routes);

    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;
