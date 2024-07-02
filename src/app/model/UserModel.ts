import IUserModel = require('./interfaces/IUserModel');

class UserModel {
  private _userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }

  get id(): number {
    return this._userModel.id;
  }

  get name(): string {
    return this._userModel.name;
  }

  get email(): string {
    return this._userModel.email;
  }

  get password(): string {
    return this._userModel.password;
  }
}

Object.seal(UserModel);

export = UserModel;
