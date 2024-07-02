import IReadController = require('./../common/IReadController');
import IWriteController = require('./../common/IWriteController');
import IBaseBusiness = require('../../../app/business/interfaces/base/IBaseBusiness');

interface BaseController<T extends IBaseBusiness<Object>>
  extends IReadController,
    IWriteController {}
export = BaseController;
