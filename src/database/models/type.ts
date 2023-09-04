import { type Schema } from "mongoose";

export interface UserStructure {
  userId: Schema.Types.ObjectId;
  userName: string;
}
