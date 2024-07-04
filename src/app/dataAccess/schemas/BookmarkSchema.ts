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
  public bookId!: string;

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
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'bookmarks',
    sequelize: sequelizeInstance,
    modelName: 'Bookmark',
  }
);

Bookmark.belongsTo(User, {
  onDelete: 'CASCADE',
});
User.hasMany(Bookmark);

export default Bookmark;
