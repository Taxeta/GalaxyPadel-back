import { type Request } from "express";

export interface UserStructure {
  _id: string;
  displayName: string;
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
  visibility: boolean;
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
  visibility: boolean;
}

export interface AuthRequest extends Request {
  userId?: string;
  displayName?: string;
}

export interface GetRacketsRequest extends AuthRequest {
  query: {
    page?: string | undefined;
    pageSize?: string | undefined;
  };
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
    { favorite: boolean; visibility: boolean }
  > {
  userId?: string;
}
