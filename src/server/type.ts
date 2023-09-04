import { type Schema } from "mongoose";

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}

export interface RacketStructure {
  _id: string;
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
  user: Schema.Types.ObjectId;
}
