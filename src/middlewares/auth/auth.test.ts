import { type NextFunction, type Request, type Response } from "express";
import admin from "firebase-admin";
import authMiddleware from "./auth";
import CustomError from "../../CustomError/CustomError.js";
import mongoose from "mongoose";
import { type UserStructure } from "../../server/types.js";
import User from "../../database/models/User.js";

jest.mock("firebase-admin");

beforeEach(() => {
  jest.clearAllMocks();
});

const token = {
  uid: "exampleToken",
};

describe("Given an auth middleware", () => {
  const res: Partial<Response> = {};
  const next: NextFunction = jest.fn();

  describe("When it receives a request with correct token, response and next function", () => {
    test("Then it should call next function", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("exampleToken"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      const id = new mongoose.Types.ObjectId().toString();

      const user: UserStructure = {
        _id: id,
        authId: token.uid,
        name: "Arturo",
      };

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(user) });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a correct token, response, next function but uid user is wrong", () => {
    test("Then the next function should be called with 'User id not found'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      const userError = new Error("User id not found");

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });

  describe("When it receives a request with no token, a response and next function", () => {
    const req: Partial<Request> = {
      header: jest.fn().mockReturnValue(undefined),
    };
    test("Then it should call the function next with error 'Unauthorized'", async () => {
      const customError = new CustomError(
        "Not token provider",
        401,
        "Unauthorized",
      );

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with invalid token, response and next function", () => {
    test("Then it should call an error with 'Invalid token' message", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      const error = new Error();

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error as CustomError);
    });
  });
});
