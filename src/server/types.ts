import { type Request } from "express";

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
  user: string;
  __v?: number;
}

export interface ReceivedRacket {
  name: string;
  shape: string;
  weight: number;
  material: string;
  power: number;
  control: number;
  description: string;
  image: string;
  favorite: boolean;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export interface AuthRequestWithBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    ReceivedRacket
  > {
  userId?: string;
}

export interface AuthRequestWithBooleanBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { favorite: boolean }
  > {
  userId?: string;
}
