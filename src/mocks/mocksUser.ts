import mongoose from "mongoose";
import { type UserStructure } from "../server/types.js";

export const userId = new mongoose.Types.ObjectId().toString();

export const mockAuthId = "asdsad5sad7";

export const userMock: UserStructure[] = [
  {
    _id: userId,
    name: "Arturo",
    authId: mockAuthId,
  },
];
