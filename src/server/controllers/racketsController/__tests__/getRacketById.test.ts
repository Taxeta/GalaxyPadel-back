import { type Request, type NextFunction, type Response } from "express";
import { getRacketById } from "../racketsControllers";
import Racket from "../../../../database/models/Racket";
import { idRacketMock, mockRackets1 } from "../../../../mocks/mocksRackets";

describe("Given a getRacketById controller", () => {
  const req: Partial<Request> = {
    params: {
      racketsId: idRacketMock,
    },
  };

  const next: NextFunction = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with a racketId like a idRacketMock, response and a next function", () => {
    Racket.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockRackets1) });

    test("Then it should call a status 200", async () => {
      const statusCode = 200;

      await getRacketById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should show a racket like 'racketMock'", async () => {
      await getRacketById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ racket: mockRackets1 });
    });
  });

  describe("When it receives a request with a racketId like a idRacketMock, response and a next function", () => {
    test("Then it should call the received next function with 500 status code and 'error'", async () => {
      const error = new Error();

      Racket.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue({}) });

      await getRacketById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
