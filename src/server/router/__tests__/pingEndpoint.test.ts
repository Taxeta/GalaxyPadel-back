import request from "supertest";
import app from "../../index.js";

jest.mock("firebase-admin");

describe("Given a GET endpoint '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should show a response with status 200 and message '🏓 Pong'", async () => {
      const expectedMessage = "🏓 Pong";
      const expectedStatusCode = 200;
      const expectedPath = "/";

      const response = await request(app)
        .get(expectedPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
