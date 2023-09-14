import mongoose from "mongoose";
import { type ReceivedRacket, type RacketStructure } from "../server/types.js";
import { userId } from "./mocksUser.js";

export const idRacketMock = new mongoose.Types.ObjectId().toString();

export const newIdMock = new mongoose.Types.ObjectId().toString();

export const newUserIdMock = new mongoose.Types.ObjectId().toString();

export const mockRackets: RacketStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Puma SolarATTACK Momo",
    shape: "Round shape",
    weight: 370,
    material: "Soft EVA",
    power: 8,
    control: 10,
    description:
      "Its low balance also makes it very easy to use, and probably part of the reason Momo has been able to pull off so many amazing “tweeners”.",
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422447099330560/MomoPuma.webp",
    favorite: false,
    user: idRacketMock,
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Adidas Metalbone 3.2",
    shape: "Diamond shape",
    weight: 355,
    material: "Soft EVA",
    power: 10,
    control: 8,
    description:
      "Slightly softer core, slightly increasing sweet spot size and core reactivity. Intermediate-advanced level players looking for power and control.",
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422444540809246/AdidasMetalbone.webp",
    favorite: false,
    user: idRacketMock,
  },
];

export const mockRackets1: RacketStructure[] = [
  {
    _id: idRacketMock,
    name: "Puma SolarATTACK Momo",
    shape: "Round shape",
    weight: 370,
    material: "Soft EVA",
    power: 8,
    control: 10,
    description:
      "Its low balance also makes it very easy to use, and probably part of the reason Momo has been able to pull off so many amazing “tweeners”.",
    image:
      "https://cdn.discordapp.com/attachments/1150483066259775582/1151422447099330560/MomoPuma.webp",
    favorite: false,
    user: userId,
  },
];

export const receivedRacketMock: ReceivedRacket = {
  name: "Puma SolarATTACK Momo",
  shape: "Round shape",
  weight: 370,
  material: "Soft EVA",
  power: 8,
  control: 10,
  description:
    "Its low balance also makes it very easy to use, and probably part of the reason Momo has been able to pull off so many amazing “tweeners”.",
  image:
    "https://cdn.discordapp.com/attachments/1150483066259775582/1151422447099330560/MomoPuma.webp",
  favorite: false,
};

export const newReceivedMock: ReceivedRacket = {
  name: "Puma SolarATTACK Momo",
  shape: "Round shape",
  weight: 370,
  material: "Soft EVA",
  power: 8,
  control: 10,
  description:
    "Its low balance also makes it very easy to use, and probably part of the reason Momo has been able to pull off so many amazing “tweeners”.",
  image:
    "https://cdn.discordapp.com/attachments/1150483066259775582/1151422447099330560/MomoPuma.webp",
  favorite: false,
};

export const postMock: RacketStructure = {
  name: "Puma SolarATTACK Momo",
  shape: "Round shape",
  weight: 370,
  material: "Soft EVA",
  power: 8,
  control: 10,
  description:
    "Its low balance also makes it very easy to use, and probably part of the reason Momo has been able to pull off so many amazing “tweeners”.",
  image:
    "https://cdn.discordapp.com/attachments/1150483066259775582/1151422447099330560/MomoPuma.webp",
  favorite: false,
  _id: idRacketMock,
  __v: 0,
  user: userId,
};
