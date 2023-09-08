import { type Request } from "express";

export interface UserStructure {
  _id: string;
  name: string;
  uid: string;
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
  user: string;
}

export interface AuthRequest extends Request {
  authId?: string;
}
