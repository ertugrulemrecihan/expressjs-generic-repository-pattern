import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from './../../dataAccess/DataAccess';
import User from './UserSchema';
import { IBookmarkAttributes } from '../interfaces/bookmark/IBookmarkAttributes';
import { IBookmarkCreationAttributes } from '../interfaces/bookmark/IBookmarkCreationAttributes';

class Bookmark
  extends Model<IBookmarkAttributes, IBookmarkCreationAttributes>
  implements IBookmarkAttributes
{
  public id!: number;
  public user_id!: number;
  public book_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'bookmarks',
    sequelize: sequelizeInstance,
  }
);

Bookmark.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

export default Bookmark;
