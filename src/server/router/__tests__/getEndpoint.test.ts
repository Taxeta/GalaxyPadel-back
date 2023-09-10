import { type RacketStructure } from "../../types.js";
import { mockRackets1 } from "../../../mocks/mocksRackets.js";
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

  const token = {
    uid: mockAuthId,
  };

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET '/rackets' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and rackets objects", async () => {
      const expectedPath = "/rackets";
      const expectedCodeStatus = 200;

      await Racket.create(mockRackets1);
      await User.create(userMock);

      const response = await request(app)
        .get(expectedPath)
        .set("Authorization", "Bearer token")
        .expect(expectedCodeStatus);

      const responseBody = response.body as {
        rackets: RacketStructure[];
      };

      mockRackets1.forEach(({ name }, racketsPosition) => {
        expect(responseBody.rackets[racketsPosition]).toHaveProperty(
          "name",
          name,
        );
      });
    });
  });
});
