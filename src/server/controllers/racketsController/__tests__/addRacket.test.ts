import { type Response, type NextFunction, type Request } from "express";
import {
  idRacketMock,
  newIdMock,
  newUserIdMock,
  receivedRacketMock,
} from "../../../../mocks/mocksRackets";
import { type AuthRequestWithBody } from "../../../types";
import Racket from "../../../../database/models/Racket";
import { addRacket } from "../racketsControllers";

describe("Given an addRacket controller", () => {
  const req: Partial<AuthRequestWithBody> = {
    body: receivedRacketMock,
    userId: idRacketMock,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  describe("When it receives a request with a user id and a new racket 'Puma SolarATTACK Momo'", () => {
    Racket.create = jest.fn().mockResolvedValue({
      ...receivedRacketMock,
      user: newUserIdMock,
      _id: newIdMock,
    });

    test("Then it should respond with status 201", async () => {
      const expectedStatusCode = 201;

      await addRacket(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should called with racket 'Puma SolarATTACK Momo'", async () => {
      const newRacketMock = {
        ...receivedRacketMock,
        user: newUserIdMock,
        _id: newIdMock,
      };

      await addRacket(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ racket: newRacketMock });
    });
  });
  describe("when it receives a request without a id, a response and a next function", () => {
    test("Then the next function should be called with 'Could not create the racket'", async () => {
      const error = new Error();

      Racket.create = jest.fn().mockRejectedValue({});

      await addRacket(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
