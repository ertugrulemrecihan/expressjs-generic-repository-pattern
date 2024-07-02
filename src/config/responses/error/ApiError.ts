class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      error: {
        message: this.message || 'Something went wrong',
      },
      success: false,
      statusCode: this.statusCode,
    };
  }
}

export default ApiError;
