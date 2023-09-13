import { type Response, type NextFunction, type Request } from "express";
import { idRacketMock } from "../../../../mocks/mocksRackets";
import Racket from "../../../../database/models/Racket";
import { deleteRacket } from "../racketsControllers";

describe("Given a deleteRackets controller", () => {
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
    Racket.findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

    test("Then it should call a status 200", async () => {
      const statusCode = 200;

      await deleteRacket(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
    test("Then it should call a message like 'Success, racket deleted!'", async () => {
      await deleteRacket(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        message: "Success, racket deleted!",
      });
    });

    describe("When it receives a request with a racketId like a idRacketMock, response and a next function", () => {
      test("Then it should call the received next function with 500 status code and ''", async () => {
        const error = new Error();

        Racket.findByIdAndDelete = jest
          .fn()
          .mockReturnValue({ exec: jest.fn().mockRejectedValue({}) });

        await deleteRacket(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
