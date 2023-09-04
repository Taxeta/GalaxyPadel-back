import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError.js";
import { endpointNotFound, generalErrorHandler } from "../errorHandlers.js";

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
      "Error, rackets not found",
      404,
      "Error, rackets not found",
    );

    const next: NextFunction = jest.fn();

    test("Then it should call the response status with code 404", () => {
      const expectedStatusCode = 404;

      generalErrorHandler(receivedError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response with a json and an error with 'Error, rackets not found' message ", () => {
      const error = "Error, rackets not found";

      generalErrorHandler(receivedError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error });
    });
  });

  describe("When it receives an error and next function", () => {
    test("Then it should call a next function and return an error like 'Error, rackets not found'", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();

      const expectedCustomError = new CustomError(
        "Error, rackets not found",
        404,
        "Error, rackets not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
