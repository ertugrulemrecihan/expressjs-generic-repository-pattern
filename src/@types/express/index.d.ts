import IUserModel from '../../app/model/interfaces/IUserModel';

declare global {
  namespace Express {
    interface Request {
      user: IUserModel;
    }
  }
}
