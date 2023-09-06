import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { endpointNotFound, generalError } from "../error.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a endpointNotFound middleware controller", () => {
  describe("When it receives a response with an error", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req: Partial<Request> = {};
    const receivedError = new CustomError(
      "Error, endpoint not found",
      404,
      "Error, endpoint not found",
    );

    const next: NextFunction = jest.fn();

    test("Then it should call the response status with code 404", () => {
      const expectedStatusCode = 404;

      generalError(receivedError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response with a json and an error with 'Error, endpoint not found' message ", () => {
      const error = "Error, endpoint not found";

      generalError(receivedError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error });
    });
  });

  describe("When it receives an error and next function", () => {
    test("Then it should call a next function and return an error like 'Error, endpoint not found'", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();

      const expectedCustomError = new CustomError(
        "Error, endpoint not found",
        404,
        "Error, endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
