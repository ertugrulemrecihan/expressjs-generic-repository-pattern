import { Optional } from 'sequelize';
import { IBookmarkAttributes } from './IBookmarkAttributes';

export interface IBookmarkCreationAttributes
  extends Optional<IBookmarkAttributes, 'id'> {}
