import { getOneMock, idRacketMock } from "../../../mocks/mocksRackets.js";
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

describe("Given a GET rackets/:racketId endpoint", () => {
  describe("When it receives a request with a racketId", () => {
    test("Then it should respond with status 200 and a racket", async () => {
      const path = `/rackets/${idRacketMock}`;
      const codeStatus = 200;

      await Racket.create(getOneMock);
      await User.create(userMock);

      const response = await request(app)
        .patch(path)
        .set("Authorization", "Bearer token")
        .send({ favorite: false })
        .expect(codeStatus);

      expect(response.body).toHaveProperty("racket", {
        ...getOneMock[0],
        favorite: true,
      });
    });
  });
});
