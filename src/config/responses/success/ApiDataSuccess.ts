import { Response } from 'express';
import ApiSuccess from './ApiSuccess';

class ApiDataSuccess extends ApiSuccess {
  static toDataJSON(message: string, statusCode: number, data: Object) {
    const successResponse = super.toJSON(message, statusCode);

    return {
      ...successResponse,
      data,
    };
  }

  static sendData(
    data: Object,
    message: string,
    statusCode: number,
    res: Response
  ) {
    return res
      .status(statusCode)
      .json(ApiDataSuccess.toDataJSON(message, statusCode, data));
  }
}

export default ApiDataSuccess;
