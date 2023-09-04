class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public privateMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;
