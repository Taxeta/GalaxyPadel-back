import "dotenv/config";
import cors, { type CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalError } from "../middlewares/error/error.js";
import { pingController } from "./controllers/pingController/pingController.js";
import racketsRouter from "./router/racketsRouter.js";
import auth from "../middlewares/auth/auth.js";
import paths from "./paths/paths.js";

const corsOptions: CorsOptions = {
  origin: [
    process.env.ALLOW_ORIGIN_PROD!,
    process.env.ALLOW_ORIGIN_LOCAL!,
    "https://jose-vera-final-project-202307-bcn.netlify.app",
  ],
  methods: ["GET"],
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.rootPath, pingController);

app.use(paths.racketsPath, auth, racketsRouter);

app.use(generalError);

app.use(endpointNotFound);

export default app;
