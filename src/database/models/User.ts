import { Schema, model } from "mongoose";
import { type UserStructure } from "../../server/types.js";

const userSchema = new Schema<UserStructure>({
  displayName: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
