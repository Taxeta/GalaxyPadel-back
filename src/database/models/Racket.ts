import { Schema, model } from "mongoose";

const racketSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  shape: {
    type: String,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  material: {
    type: String,
    require: true,
  },
  power: {
    type: Number,
    require: true,
  },
  control: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  favorite: {
    type: Boolean,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Racket = model("Racket", racketSchema, "rackets");

export default Racket;
