import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "../error.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an errorHandler wich can't handle this error", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req: Partial<Request> = {};
    const receivedError = new Error();
    const next: NextFunction = jest.fn();

    test("Then it should call a response with codeStatus 500", () => {
      const expectedStatusCode = 500;

      generalError(
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

      generalError(
        receivedError as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
