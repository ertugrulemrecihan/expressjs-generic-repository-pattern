import { Model } from 'sequelize';
import { IBookmarkAttributes } from '../../dataAccess/interfaces/bookmark/IBookmarkAttributes';
import { IBookmarkCreationAttributes } from '../../dataAccess/interfaces/bookmark/IBookmarkCreationAttributes';

interface IBookmarkModel
  extends Model<IBookmarkAttributes, IBookmarkCreationAttributes>,
    IBookmarkAttributes {}

export = IBookmarkModel;
