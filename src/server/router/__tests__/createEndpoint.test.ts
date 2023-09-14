import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../../database/models/User";
import { mockAuthId, userMock } from "../../../mocks/mocksUser";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import admin from "firebase-admin";
import app from "../..";
import { postMock } from "../../../mocks/mocksRackets";
import request from "supertest";
import Racket from "../../../database/models/Racket";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

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

const token: Partial<DecodedIdToken> = {
  uid: mockAuthId,
};

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

describe("Given a POST /rackets endpoint", () => {
  describe("When it receives a request with a racket 'Puma SolarATTACK Momo'", () => {
    beforeEach(async () => {
      await Racket.create();
    });

    test("Then it should respond with status 201 and racket 'Puma SolarATTACK Momo'", async () => {
      const expectedStatus = 201;
      const path = "/rackets";

      await User.create(userMock);

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer token")
        .send(postMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("racket", postMock);
    });
  });
});
