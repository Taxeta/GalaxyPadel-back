import mongoose from "mongoose";
import { type RacketStructure } from "../server/type.js";

export const idRacketMock = new mongoose.Types.ObjectId().toString();

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
      "https://global-uploads.webflow.com/63b3fa45463266b20f659562/649e6f862b0a67ce08e19fb2_64956aba227b3b839fb4ec8c_6470cbdbd3b6b46a21ebf792_Puma%252520Solar%252520Attack%252520Momo%252520Review.png",
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
      "https://global-uploads.webflow.com/63b3fa45463266b20f659562/649e6f8305268fb9a97f602b_64217f65b74db7945744bd8f_641980999afb8b103ce7dc93_Metalbone%2525203.2%252520Review.png",
    favorite: false,
    user: idRacketMock,
  },
];
