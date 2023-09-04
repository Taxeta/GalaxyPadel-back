import { type Request, type Response } from "express";
import { pingController } from "./pingController";

describe("Given a pingController controller", () => {
  describe("When the request is sent to '/'", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should respond with status code 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with '🏓 Pong' message", () => {
      const message = "🏓 Pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
