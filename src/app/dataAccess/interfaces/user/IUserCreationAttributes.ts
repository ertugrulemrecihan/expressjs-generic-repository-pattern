import { Optional } from 'sequelize';
import { IUserAttributes } from './IUserAttributes';

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, 'id'> {}
