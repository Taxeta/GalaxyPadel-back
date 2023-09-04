import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  endpointNotFound,
  generalErrorHandler,
} from "../middlewares/errorHandlers";

const corsOptions = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
  methods: "GET, POST, DELETE, PATCH",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.get("/");

app.use(generalErrorHandler);
app.use(endpointNotFound);

export default app;
