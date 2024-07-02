import User from '../dataAccess/schemas/UserSchema';
import IUserModel = require('../model/interfaces/IUserModel');
import BaseRepository = require('./base/BaseRepository');

class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(User);
  }
}

Object.seal(UserRepository);
export = UserRepository;
