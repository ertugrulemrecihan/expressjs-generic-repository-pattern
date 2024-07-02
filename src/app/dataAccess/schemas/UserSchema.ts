import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from './../../dataAccess/DataAccess';
import { IUserAttributes } from '../interfaces/user/IUserAttributes';
import { IUserCreationAttributes } from '../interfaces/user/IUserCreationAttributes';

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelizeInstance,
  }
);

export default User;
