import { type Schema } from "mongoose";

export interface UserStructure {
  userId: Schema.Types.ObjectId;
  userName: string;
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
}
