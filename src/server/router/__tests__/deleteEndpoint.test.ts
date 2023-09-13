import { idRacketMock, mockRackets1 } from "../../../mocks/mocksRackets.js";
import app from "../../index.js";
import admin from "firebase-admin";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import { mockAuthId, userMock } from "../../../mocks/mocksUser.js";
import User from "../../../database/models/User.js";
import Racket from "../../../database/models/Racket.js";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const token = {
  uid: mockAuthId,
};

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

describe("Given a DELETE rackets/:racketId endpoint", () => {
  describe("When it receives a request with a racketId", () => {
    test("Then it should respond with status 200 and 'Success, racket deleted!'", async () => {
      const message = "Success, racket deleted!";
      const path = `/rackets/${idRacketMock}`;
      const codeStatus = 200;

      await Racket.create(mockRackets1);
      await User.create(userMock);

      const response = await request(app)
        .delete(path)
        .set("Authorization", "Bearer token")
        .expect(codeStatus);

      expect(response.body).toHaveProperty("message", message);
    });
  });
});
