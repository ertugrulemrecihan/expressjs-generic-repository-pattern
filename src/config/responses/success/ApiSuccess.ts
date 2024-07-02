import { Response } from 'express';

class ApiSuccess {
  static toJSON(message: string, statusCode: number) {
    return {
      message,
      success: true,
      statusCode,
    };
  }

  static send(message: string, statusCode: number, res: Response) {
    return res.status(statusCode).json(ApiSuccess.toJSON(message, statusCode));
  }
}

export default ApiSuccess;
