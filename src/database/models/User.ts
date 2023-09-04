import { Schema, model } from "mongoose";
import { type UserStructure } from "../type";

const userSchema = new Schema<UserStructure>({
  userName: { type: String, required: true },
});

const User = model("User", userSchema, "users");

export default User;
