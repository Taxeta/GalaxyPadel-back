import { type UserStructure } from "../server/type.js";
import { idRacketMock } from "./mocksRackets.js";

export const mockAuthId = "uid";

export const userMock: UserStructure = {
  _id: idRacketMock,
  name: "Arturo",
  uid: mockAuthId,
};
