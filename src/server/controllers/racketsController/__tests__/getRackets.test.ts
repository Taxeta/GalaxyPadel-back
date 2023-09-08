import { type NextFunction, type Response } from "express";
import { getRackets } from "../racketsControllers.js";
import Racket from "../../../../database/models/Racket.js";
import { mockRackets } from "../../../../mocks/mocksRackets.js";
import CustomError from "../../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../../type.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<AuthRequest> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a getRackets controller", () => {
  describe("When it receives a response", () => {
    Racket.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockRackets),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await getRackets(
        req as AuthRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with two rackets", async () => {
      await getRackets(
        req as AuthRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ rackets: mockRackets });
    });
  });

  describe("When it receives a next function and can't get any racket from the database", () => {
    test("Then it should received next function with statusCode 404 and 'Can't retrieve rackets' message", async () => {
      const expectedErrorMessage =
        "Cannot read properties of undefined (reading 'json')";

      const customError = new CustomError(
        expectedErrorMessage,
        404,
        expectedErrorMessage,
      );

      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await getRackets(
        req as AuthRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
