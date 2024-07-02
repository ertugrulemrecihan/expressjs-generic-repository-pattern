import IBookmarkModel = require('../../model/interfaces/IBookmarkModel');
import IBaseBusiness = require('./base/IBaseBusiness');

interface IBookmarkBusiness extends IBaseBusiness<IBookmarkModel> {}

export = IBookmarkBusiness;
