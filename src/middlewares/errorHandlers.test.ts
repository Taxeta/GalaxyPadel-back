import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "./CustomError";
import { generalErrorHandler } from "./errorHandlers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalErrorHandler middleware", () => {
  describe("When it receives a response and errorHandler can't handle this error", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req: Partial<Request> = {};
    const receivedError = new Error();
    const next: NextFunction = jest.fn();

    test("Then it should call a response with codeStatus 500", () => {
      const expectedStatusCode = 500;

      generalErrorHandler(
        receivedError as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then it should respond with 'Internal server error'", () => {
      const receivedError = new Error();
      const expectedErrorMessage = "Internal server error";

      generalErrorHandler(
        receivedError as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
