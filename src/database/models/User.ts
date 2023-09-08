import { Schema, model } from "mongoose";
import { type UserStructure } from "../../server/type.js";

const userSchema = new Schema<UserStructure>({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
