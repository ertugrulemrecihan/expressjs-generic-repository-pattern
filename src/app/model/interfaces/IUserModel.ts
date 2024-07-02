import { Model } from 'sequelize';
import { IUserAttributes } from '../../dataAccess/interfaces/user/IUserAttributes';
import { IUserCreationAttributes } from '../../dataAccess/interfaces/user/IUserCreationAttributes';

interface IUserModel
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}

export = IUserModel;
