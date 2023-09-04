class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    private readonly privatMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;
