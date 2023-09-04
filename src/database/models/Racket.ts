import { Schema, model } from "mongoose";
import { type RacketStructure } from "../type";

const racketSchema = new Schema<RacketStructure>({
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
});

const Racket = model("Racket", racketSchema, "rackets");

export default Racket;
