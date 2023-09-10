import { type UserStructure } from "../server/types.js";
import { idRacketMock } from "./mocksRackets.js";

export const mockAuthId = "authId";

export const userMock: UserStructure[] = [
  {
    _id: idRacketMock,
    name: "Arturo",
    authId: mockAuthId,
  },
];
