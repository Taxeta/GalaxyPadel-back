import { type NextFunction, type Request, type Response } from "express";
import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import authMiddleware from "../auth";
import CustomError from "../../CustomError/CustomError";

jest.mock("firebase-admin");

const token: Partial<DecodedIdToken> = {};

describe("Given an auth middleware", () => {
  const res: Partial<Response> = {};
  const next: NextFunction = jest.fn();

  describe("When it receives a request with correct token", () => {
    test("Then it should call next function", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("exampleToken"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request with no token, a response and a function", () => {
    test("Then it should call the function next with error 'Unauthorized'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      const customError = new CustomError(
        "Unauthorized",
        401,
        "Not token provider",
      );

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
