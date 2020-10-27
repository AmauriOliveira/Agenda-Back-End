class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statudCode = 400) {
    this.message = message;
    this.statusCode = statudCode;
  }
}

export default AppError;
