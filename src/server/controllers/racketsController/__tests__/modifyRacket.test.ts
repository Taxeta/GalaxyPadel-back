import { type NextFunction, type Request, type Response } from "express";
import {
  idRacketMock,
  receivedRacketMock,
} from "../../../../mocks/mocksRackets";
import { type AuthRequestWithBooleanBody } from "../../../types";
import Racket from "../../../../database/models/Racket";
import { modifyRacketById } from "../racketsControllers";

describe("Given a modifyRacket controller", () => {
  const req: Partial<AuthRequestWithBooleanBody> = {
    params: { userId: idRacketMock },
    body: receivedRacketMock,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  Racket.findByIdAndUpdate = jest.fn().mockReturnValue({
    exec: jest
      .fn()
      .mockResolvedValue({ ...receivedRacketMock, favorite: true }),
  });

  describe("When it receives a request with a idRacketMock and a  racket, response and next function", () => {
    test("Then it should show response with the 200 status code", async () => {
      const expectedStatusCode = 200;

      await modifyRacketById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method should respond with the racket property modified", async () => {
      await modifyRacketById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        racket: { ...receivedRacketMock, favorite: true },
      });
    });
  });

  describe("When it receives a request without racket, with a response and next function", () => {
    test("Then the next function should be called with 'error'", async () => {
      const error = new Error();

      Racket.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue({}),
      });

      await modifyRacketById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
