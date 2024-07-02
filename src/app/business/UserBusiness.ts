import UserRepository = require('../repository/UserRepository');
import IUserBusiness = require('./interfaces/IUserBusiness');

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  fetchAll(callback: (error: any, result: any | null) => void) {
    this._userRepository.fetchAll(callback);
  }

  findById(id: number, callback: (error: any, result: any | null) => void) {
    this._userRepository.findById(id, callback);
  }

  findOneByQuery(
    query: any,
    callback: (error: any, result: any | null) => void
  ) {
    this._userRepository.findOneByQuery(query, callback);
  }

  fetchByQuery(query: any, callback: (error: any, result: any | null) => void) {
    this._userRepository.fetchByQuery(query, callback);
  }

  create(item: any, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback);
  }

  update(id: number, item: any, callback: (error: any, result: any) => void) {
    this._userRepository.update(id, item, callback);
  }

  delete(id: number, callback: (error: any, result: any) => void) {
    this._userRepository.delete(id, callback);
  }
}

Object.seal(UserBusiness);

export = UserBusiness;
