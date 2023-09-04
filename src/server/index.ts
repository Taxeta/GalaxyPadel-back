import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  endpointNotFound,
  generalErrorHandler,
} from "../middlewares/errorHandlers.js";
import { pingController } from "./controllers/pingController/pingController.js";

const corsOptions = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
};

const app = express();

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.get("/", pingController);

app.use(generalErrorHandler);

app.use(endpointNotFound);

export default app;
